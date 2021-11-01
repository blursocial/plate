import { createHyperscript } from 'slate-hyperscript';
import { Text, Range, createEditor as createEditor$1, Node, Element } from 'slate';

const getHtmlDocument = html => new DOMParser().parseFromString(html, 'text/html');

// eslint-disable-next-line max-classes-per-file

/**
 * A weak map to hold anchor tokens.
 */
const ANCHOR = new WeakMap();
/**
 * A weak map to hold focus tokens.
 */

const FOCUS = new WeakMap();
/**
 * All tokens inherit from a single constructor for `instanceof` checking.
 */

class Token {}
/**
 * Anchor tokens represent the selection's anchor point.
 */

class AnchorToken extends Token {
  constructor(props = {}) {
    super();
    const {
      offset,
      path
    } = props;
    this.offset = offset;
    this.path = path;
  }

}
/**
 * Focus tokens represent the selection's focus point.
 */

class FocusToken extends Token {
  constructor(props = {}) {
    super();
    const {
      offset,
      path
    } = props;
    this.offset = offset;
    this.path = path;
  }

}
/**
 * Add an anchor token to the end of a text node.
 */

const addAnchorToken = (text, token) => {
  const offset = text.text.length;
  ANCHOR.set(text, [offset, token]);
};
/**
 * Get the offset if a text node has an associated anchor token.
 */

const getAnchorOffset = text => {
  return ANCHOR.get(text);
};
/**
 * Add a focus token to the end of a text node.
 */

const addFocusToken = (text, token) => {
  const offset = text.text.length;
  FOCUS.set(text, [offset, token]);
};
/**
 * Get the offset if a text node has an associated focus token.
 */

const getFocusOffset = text => {
  return FOCUS.get(text);
};

/**
 * Resolve the descedants of a node by normalizing the children that can be
 * passed into a hyperscript creator function.
 */

const STRINGS = new WeakSet();

const resolveDescendants = children => {
  const nodes = [];

  const addChild = child => {
    if (child == null) {
      return;
    }

    const prev = nodes[nodes.length - 1];

    if (typeof child === 'string') {
      const text = {
        text: child
      };
      STRINGS.add(text);
      child = text;
    }

    if (Text.isText(child)) {
      const c = child; // HACK: fix typescript complaining

      if (Text.isText(prev) && STRINGS.has(prev) && STRINGS.has(c) && Text.equals(prev, c, {
        loose: true
      })) {
        prev.text += c.text;
      } else {
        nodes.push(c);
      }
    } else if (Element.isElement(child)) {
      nodes.push(child);
    } else if (child instanceof Token) {
      let n = nodes[nodes.length - 1];

      if (!Text.isText(n)) {
        addChild('');
        n = nodes[nodes.length - 1];
      }

      if (child instanceof AnchorToken) {
        addAnchorToken(n, child);
      } else if (child instanceof FocusToken) {
        addFocusToken(n, child);
      }
    } else {
      throw new Error(`Unexpected hyperscript child object: ${child}`);
    }
  };

  for (const child of children.flat(Infinity)) {
    addChild(child);
  }

  return nodes;
};
/**
 * Create an anchor token.
 */


function createAnchor(tagName, attributes) {
  return new AnchorToken(attributes);
}
/**
 * Create an anchor and a focus token.
 */

function createCursor(tagName, attributes) {
  return [new AnchorToken(attributes), new FocusToken(attributes)];
}
/**
 * Create an `Element` object.
 */

function createElement(tagName, attributes, children) {
  return { ...attributes,
    children: resolveDescendants(children)
  };
}
/**
 * Create a focus token.
 */

function createFocus(tagName, attributes) {
  return new FocusToken(attributes);
}
/**
 * Create a fragment.
 */

function createFragment(tagName, attributes, children) {
  return resolveDescendants(children);
}
/**
 * Create a `Selection` object.
 */

function createSelection(tagName, attributes, children) {
  const anchor = children.find(c => c instanceof AnchorToken);
  const focus = children.find(c => c instanceof FocusToken);

  if (!anchor || !anchor.offset || !anchor.path) {
    throw new Error(`The <selection> hyperscript tag must have an <anchor> tag as a child with \`path\` and \`offset\` attributes defined.`);
  }

  if (!focus || !focus.offset || !focus.path) {
    throw new Error(`The <selection> hyperscript tag must have a <focus> tag as a child with \`path\` and \`offset\` attributes defined.`);
  }

  return {
    anchor: {
      offset: anchor.offset,
      path: anchor.path
    },
    focus: {
      offset: focus.offset,
      path: focus.path
    },
    ...attributes
  };
}
/**
 * Create a `Text` object.
 */

function createText(tagName, attributes, children) {
  const nodes = resolveDescendants(children);

  if (nodes.length > 1) {
    throw new Error(`The <text> hyperscript tag must only contain a single node's worth of children.`);
  }

  let [node] = nodes;

  if (node == null) {
    node = {
      text: ''
    };
  }

  if (!Text.isText(node)) {
    throw new Error(`
    The <text> hyperscript tag can only contain text content as children.`);
  } // COMPAT: If they used the <text> tag we want to guarantee that it won't be
  // merge with other string children.


  STRINGS.delete(node);
  Object.assign(node, attributes);
  return node;
}
/**
 * Create a top-level `Editor` object.
 */

function createEditor(tagName, attributes, children) {
  const otherChildren = [];
  let selectionChild;

  for (const child of children) {
    if (Range.isRange(child)) {
      selectionChild = child;
    } else {
      otherChildren.push(child);
    }
  }

  const descendants = resolveDescendants(otherChildren);
  const selection = {};
  const editor = createEditor$1();
  Object.assign(editor, attributes);
  editor.children = descendants; // Search the document's texts to see if any of them have tokens associated
  // that need incorporated into the selection.

  for (const [node, path] of Node.texts(editor)) {
    const anchor = getAnchorOffset(node);
    const focus = getFocusOffset(node);

    if (anchor != null) {
      const [offset] = anchor;
      selection.anchor = {
        path,
        offset
      };
    }

    if (focus != null) {
      const [offset] = focus;
      selection.focus = {
        path,
        offset
      };
    }
  }

  if (selection.anchor && !selection.focus) {
    throw new Error(`Slate hyperscript ranges must have both \`<anchor />\` and \`<focus />\` defined if one is defined, but you only defined \`<anchor />\`. For collapsed selections, use \`<cursor />\` instead.`);
  }

  if (!selection.anchor && selection.focus) {
    throw new Error(`Slate hyperscript ranges must have both \`<anchor />\` and \`<focus />\` defined if one is defined, but you only defined \`<focus />\`. For collapsed selections, use \`<cursor />\` instead.`);
  }

  if (selectionChild != null) {
    editor.selection = selectionChild;
  } else if (Range.isRange(selection)) {
    editor.selection = selection;
  }

  return editor;
}

const ELEMENT_H1 = 'h1';
const ELEMENT_H2 = 'h2';
const ELEMENT_H3 = 'h3';
const ELEMENT_H4 = 'h4';
const ELEMENT_H5 = 'h5';
const ELEMENT_H6 = 'h6';
const ELEMENT_IMAGE = 'img';
const ELEMENT_LI = 'li';
const ELEMENT_LINK = 'a';
const ELEMENT_MEDIA_EMBED = 'media_embed';
const ELEMENT_MENTION = 'mention';
const ELEMENT_MENTION_INPUT = 'mention_input';
const ELEMENT_OL = 'ol';
const ELEMENT_PARAGRAPH = 'p';
const ELEMENT_TABLE = 'table';
const ELEMENT_TD = 'td';
const ELEMENT_TH = 'th';
const ELEMENT_TODO_LI = 'action_item';
const ELEMENT_TR = 'tr';
const ELEMENT_UL = 'ul';
const ELEMENT_BLOCKQUOTE = 'blockquote';
const ELEMENT_CODE_BLOCK = 'code_block';
const ELEMENT_CODE_LINE = 'code_line';
const ELEMENT_LIC = 'lic';
const ELEMENT_EXCALIDRAW = 'excalidraw';
const voidChildren = [{
  text: ''
}];
const jsx = createHyperscript({
  elements: {
    ha: {
      type: ELEMENT_LINK
    },
    hblockquote: {
      type: ELEMENT_BLOCKQUOTE
    },
    hcodeblock: {
      type: ELEMENT_CODE_BLOCK
    },
    hcodeline: {
      type: ELEMENT_CODE_LINE
    },
    hexcalidraw: {
      type: ELEMENT_EXCALIDRAW
    },
    hh1: {
      type: ELEMENT_H1
    },
    hh2: {
      type: ELEMENT_H2
    },
    hh3: {
      type: ELEMENT_H3
    },
    hh4: {
      type: ELEMENT_H4
    },
    hh5: {
      type: ELEMENT_H5
    },
    hh6: {
      type: ELEMENT_H6
    },
    himg: {
      type: ELEMENT_IMAGE,
      children: voidChildren
    },
    hli: {
      type: ELEMENT_LI
    },
    hmention: {
      type: ELEMENT_MENTION,
      children: voidChildren
    },
    hmentioninput: {
      type: ELEMENT_MENTION_INPUT,
      children: voidChildren
    },
    hmediaembed: {
      type: ELEMENT_MEDIA_EMBED,
      children: voidChildren
    },
    hol: {
      type: ELEMENT_OL
    },
    hp: {
      type: ELEMENT_PARAGRAPH
    },
    htable: {
      type: ELEMENT_TABLE
    },
    htd: {
      type: ELEMENT_TD
    },
    hth: {
      type: ELEMENT_TH
    },
    htodoli: {
      type: ELEMENT_TODO_LI
    },
    htr: {
      type: ELEMENT_TR
    },
    hul: {
      type: ELEMENT_UL
    },
    hdefault: {
      type: ELEMENT_PARAGRAPH
    },
    hlic: {
      type: ELEMENT_LIC
    }
  },
  creators: {
    htext: createText
  }
});

export { AnchorToken, FocusToken, Token, addAnchorToken, addFocusToken, createAnchor, createCursor, createEditor, createElement, createFocus, createFragment, createSelection, createText, getAnchorOffset, getFocusOffset, getHtmlDocument, jsx };
//# sourceMappingURL=index.es.js.map
