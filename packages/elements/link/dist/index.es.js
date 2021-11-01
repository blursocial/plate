import { getPlatePluginOptions, getPlatePluginType, getRenderElement, getPlatePluginTypes } from '@udecode/plate-core';
import { getNodeDeserializer, wrapNodes, isCollapsed, insertNodes, unwrapNodes, getAbove, isUrl, getRangeBefore, getText, someNode, getRangeFromBlockStart } from '@udecode/plate-common';
import { Editor, Transforms } from 'slate';
import { withRemoveEmptyNodes } from '@udecode/plate-normalizers';

const ELEMENT_LINK = 'a';
const DEFAULTS_LINK = {
  getNodeProps: ({
    element
  }) => ({
    url: element === null || element === void 0 ? void 0 : element.url
  }),
  hotkey: 'mod+k'
};

const getLinkDeserialize = () => editor => {
  const options = getPlatePluginOptions(editor, ELEMENT_LINK);
  return {
    element: getNodeDeserializer({
      type: options.type,
      getNode: el => ({
        type: options.type,
        url: el.getAttribute('href')
      }),
      rules: [{
        nodeNames: 'A'
      }],
      ...options.deserialize
    })
  };
};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Constants.
 */

var IS_MAC = typeof window != 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

var MODIFIERS = {
  alt: 'altKey',
  control: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey'
};

var ALIASES = {
  add: '+',
  break: 'pause',
  cmd: 'meta',
  command: 'meta',
  ctl: 'control',
  ctrl: 'control',
  del: 'delete',
  down: 'arrowdown',
  esc: 'escape',
  ins: 'insert',
  left: 'arrowleft',
  mod: IS_MAC ? 'meta' : 'control',
  opt: 'alt',
  option: 'alt',
  return: 'enter',
  right: 'arrowright',
  space: ' ',
  spacebar: ' ',
  up: 'arrowup',
  win: 'meta',
  windows: 'meta'
};

var CODES = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  control: 17,
  alt: 18,
  pause: 19,
  capslock: 20,
  escape: 27,
  ' ': 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  arrowleft: 37,
  arrowup: 38,
  arrowright: 39,
  arrowdown: 40,
  insert: 45,
  delete: 46,
  meta: 91,
  numlock: 144,
  scrolllock: 145,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  '\'': 222
};

for (var f = 1; f < 20; f++) {
  CODES['f' + f] = 111 + f;
}

/**
 * Is hotkey?
 */

function isHotkey(hotkey, options, event) {
  if (options && !('byKey' in options)) {
    event = options;
    options = null;
  }

  if (!Array.isArray(hotkey)) {
    hotkey = [hotkey];
  }

  var array = hotkey.map(function (string) {
    return parseHotkey(string, options);
  });
  var check = function check(e) {
    return array.some(function (object) {
      return compareHotkey(object, e);
    });
  };
  var ret = event == null ? check : check(event);
  return ret;
}

function isCodeHotkey(hotkey, event) {
  return isHotkey(hotkey, event);
}

function isKeyHotkey(hotkey, event) {
  return isHotkey(hotkey, { byKey: true }, event);
}

/**
 * Parse.
 */

function parseHotkey(hotkey, options) {
  var byKey = options && options.byKey;
  var ret = {};

  // Special case to handle the `+` key since we use it as a separator.
  hotkey = hotkey.replace('++', '+add');
  var values = hotkey.split('+');
  var length = values.length;

  // Ensure that all the modifiers are set to false unless the hotkey has them.

  for (var k in MODIFIERS) {
    ret[MODIFIERS[k]] = false;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      var optional = value.endsWith('?') && value.length > 1;

      if (optional) {
        value = value.slice(0, -1);
      }

      var name = toKeyName(value);
      var modifier = MODIFIERS[name];

      if (length === 1 || !modifier) {
        if (byKey) {
          ret.key = name;
        } else {
          ret.which = toKeyCode(value);
        }
      }

      if (modifier) {
        ret[modifier] = optional ? null : true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return ret;
}

/**
 * Compare.
 */

function compareHotkey(object, event) {
  for (var key in object) {
    var expected = object[key];
    var actual = void 0;

    if (expected == null) {
      continue;
    }

    if (key === 'key' && event.key != null) {
      actual = event.key.toLowerCase();
    } else if (key === 'which') {
      actual = expected === 91 && event.which === 93 ? 91 : event.which;
    } else {
      actual = event[key];
    }

    if (actual == null && expected === false) {
      continue;
    }

    if (actual !== expected) {
      return false;
    }
  }

  return true;
}

/**
 * Utils.
 */

function toKeyCode(name) {
  name = toKeyName(name);
  var code = CODES[name] || name.toUpperCase().charCodeAt(0);
  return code;
}

function toKeyName(name) {
  name = name.toLowerCase();
  name = ALIASES[name] || name;
  return name;
}

/**
 * Export.
 */

exports.default = isHotkey;
exports.isHotkey = isHotkey;
exports.isCodeHotkey = isCodeHotkey;
exports.isKeyHotkey = isKeyHotkey;
exports.parseHotkey = parseHotkey;
exports.compareHotkey = compareHotkey;
exports.toKeyCode = toKeyCode;
exports.toKeyName = toKeyName;
});

var isHotkey = unwrapExports(lib);
lib.isHotkey;
lib.isCodeHotkey;
lib.isKeyHotkey;
lib.parseHotkey;
lib.compareHotkey;
lib.toKeyCode;
lib.toKeyName;

/**
 * Wrap selected nodes with a link and collapse at the end.
 */

const wrapLink = (editor, {
  at,
  url
}) => {
  wrapNodes(editor, {
    type: getPlatePluginType(editor, ELEMENT_LINK),
    url,
    children: []
  }, {
    at,
    split: true
  });
};

/**
 * Unwrap link at a location (default: selection).
 * Then, the focus of the location is set to selection focus.
 * Then, wrap the link at the location.
 */

const upsertLinkAtSelection = (editor, {
  url,
  wrap
}) => {
  if (!editor.selection) return;
  const type = getPlatePluginType(editor, ELEMENT_LINK);

  if (!wrap && isCollapsed(editor.selection)) {
    return insertNodes(editor, {
      type,
      url,
      children: [{
        text: url
      }]
    });
  } // if our cursor is inside an existing link, but don't have the text selected, select it now


  if (wrap && isCollapsed(editor.selection)) {
    const linkLeaf = Editor.leaf(editor, editor.selection);
    const [, inlinePath] = linkLeaf;
    Transforms.select(editor, inlinePath);
  }

  unwrapNodes(editor, {
    at: editor.selection,
    match: {
      type
    }
  });
  wrapLink(editor, {
    at: editor.selection,
    url
  });
  Transforms.collapse(editor, {
    edge: 'end'
  });
};

const getAndUpsertLink = async (editor, getLinkUrl) => {
  const type = getPlatePluginType(editor, ELEMENT_LINK);
  let prevUrl = '';
  const linkNode = getAbove(editor, {
    match: {
      type
    }
  });

  if (linkNode) {
    prevUrl = linkNode[0].url;
  }

  let url;

  if (getLinkUrl) {
    url = await getLinkUrl(prevUrl);
  } else {
    url = window.prompt(`Enter the URL of the link:`, prevUrl);
  }

  if (!url) {
    linkNode && editor.selection && unwrapNodes(editor, {
      at: editor.selection,
      match: {
        type: getPlatePluginType(editor, ELEMENT_LINK)
      }
    });
    return;
  } // If our cursor is in middle of a link, then we don't want to insert it inline


  const shouldWrap = linkNode !== undefined && isCollapsed(editor.selection);
  upsertLinkAtSelection(editor, {
    url,
    wrap: shouldWrap
  });
};

const getLinkOnKeyDown = options => editor => e => {
  const {
    hotkey
  } = getPlatePluginOptions(editor, ELEMENT_LINK);
  if (!hotkey) return;

  if (isHotkey(hotkey, e)) {
    e.preventDefault();
    e.stopPropagation();
    getAndUpsertLink(editor, options === null || options === void 0 ? void 0 : options.getLinkUrl);
  }
};

const upsertLink = (editor, {
  url,
  at
}) => {
  unwrapNodes(editor, {
    at,
    match: {
      type: getPlatePluginType(editor, ELEMENT_LINK)
    }
  });
  const newSelection = editor.selection;
  wrapLink(editor, {
    at: { ...at,
      focus: newSelection.focus
    },
    url
  });
};

const upsertLinkIfValid = (editor, {
  isUrl
}) => {
  const rangeFromBlockStart = getRangeFromBlockStart(editor);
  const textFromBlockStart = getText(editor, rangeFromBlockStart);

  if (rangeFromBlockStart && isUrl(textFromBlockStart)) {
    upsertLink(editor, {
      url: textFromBlockStart,
      at: rangeFromBlockStart
    });
    return true;
  }
};
/**
 * Insert space after a url to wrap a link.
 * Lookup from the block start to the cursor to check if there is an url.
 * If not found, lookup before the cursor for a space character to check the url.
 *
 * On insert data:
 * Paste a string inside a link element will edit its children text but not its url.
 *
 */


const withLink = ({
  isUrl: isUrl$1 = isUrl,
  rangeBeforeOptions = {
    matchString: ' ',
    skipInvalid: true,
    afterMatch: true,
    multiPaths: true
  }
} = {}) => editor => {
  const {
    insertData,
    insertText
  } = editor;
  const type = getPlatePluginType(editor, ELEMENT_LINK);

  editor.insertText = text => {
    if (text === ' ' && isCollapsed(editor.selection)) {
      const selection = editor.selection;

      if (upsertLinkIfValid(editor, {
        isUrl: isUrl$1
      })) {
        return insertText(text);
      }

      const beforeWordRange = getRangeBefore(editor, selection, rangeBeforeOptions);

      if (beforeWordRange) {
        const beforeWordText = getText(editor, beforeWordRange);

        if (isUrl$1(beforeWordText)) {
          upsertLink(editor, {
            url: beforeWordText,
            at: beforeWordRange
          });
        }
      }
    }

    insertText(text);
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');

    if (text) {
      if (isUrl$1(text)) {
        return upsertLinkAtSelection(editor, {
          url: text
        });
      }

      if (someNode(editor, {
        match: {
          type
        }
      })) {
        return insertText(text);
      }
    }

    insertData(data);
  }; // editor.insertBreak = () => {
  //   if (upsertLinkIfValid(editor, { link, isUrl })) {
  //     console.info('fix cursor');
  //   }
  //
  //   insertBreak();
  // };


  editor = withRemoveEmptyNodes({
    type
  })(editor);
  return editor;
};

/**
 * Enables support for hyperlinks.
 */

const createLinkPlugin = options => ({
  pluginKeys: ELEMENT_LINK,
  renderElement: getRenderElement(ELEMENT_LINK),
  deserialize: getLinkDeserialize(),
  inlineTypes: getPlatePluginTypes(ELEMENT_LINK),
  onKeyDown: getLinkOnKeyDown(options),
  withOverrides: withLink(options)
});

export { DEFAULTS_LINK, ELEMENT_LINK, createLinkPlugin, getAndUpsertLink, getLinkDeserialize, getLinkOnKeyDown, upsertLinkAtSelection, withLink, wrapLink };
//# sourceMappingURL=index.es.js.map
