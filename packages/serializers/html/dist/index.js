'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCore = require('@udecode/plate-core');
var plateSerializer = require('@udecode/plate-serializer');
var plateCommon = require('@udecode/plate-common');
var slateHyperscript = require('slate-hyperscript');
var slate = require('slate');
var server = require('react-dom/server');

/**
 * Convert HTML string into HTML element.
 */
const htmlStringToDOMNode = (rawHtml, stripWhitespace = true) => {
  const node = document.createElement('body');
  node.innerHTML = rawHtml;

  if (stripWhitespace) {
    node.innerHTML = node.innerHTML.replace(/(\r\n|\n|\r|\t)/gm, '');
  }

  return node;
};

/**
 * Deserialize HTML to break line.
 */
const deserializeHTMLToBreak = node => {
  if (node.nodeName === 'BR') {
    return '\n';
  }
};

/**
 * Deserialize HTML to Element.
 */

const deserializeHTMLToElement = (editor, {
  plugins,
  element,
  children
}) => {
  let slateElement;
  let withoutChildren;
  plugins.some(({
    deserialize: pluginDeserializers
  }) => {
    const elementDeserializers = pluginDeserializers === null || pluginDeserializers === void 0 ? void 0 : pluginDeserializers(editor).element;
    if (!elementDeserializers) return;
    return elementDeserializers.some(deserializer => {
      const deserialized = deserializer.deserialize(element);
      if (!deserialized) return;
      slateElement = deserialized;
      withoutChildren = deserializer.withoutChildren;
      return true;
    });
  });

  if (slateElement) {
    let descendants = children;

    if (!descendants.length || withoutChildren) {
      descendants = [{
        text: ''
      }];
    }

    return slateHyperscript.jsx('element', slateElement, descendants);
  }
};

/**
 * Deserialize HTML body element to Fragment.
 */

const deserializeHTMLToFragment = ({
  element,
  children
}) => {
  if (element.nodeName === 'BODY') {
    return slateHyperscript.jsx('fragment', {}, children);
  }
};

/**
 * Deserialize HTML to TDescendant[] with marks on Text.
 * Build the leaf from the leaf deserializers of each plugin.
 */
const deserializeHTMLToMarks = (editor, {
  plugins,
  element,
  children
}) => {
  let leaf = {};
  plugins.forEach(({
    deserialize: pluginDeserializers
  }) => {
    const leafDeserializers = pluginDeserializers === null || pluginDeserializers === void 0 ? void 0 : pluginDeserializers(editor).leaf;
    if (!leafDeserializers) return;
    leafDeserializers.forEach(deserializer => {
      const leafPart = deserializer.deserialize(element);
      if (!leafPart) return;
      leaf = { ...leaf,
        ...leafPart
      };
    });
  });
  return children.reduce((arr, child) => {
    if (!child) return arr;

    if (plateCore.isElement(child)) {
      if (Object.keys(leaf).length) {
        plateCommon.mergeDeepToNodes({
          node: child,
          source: leaf,
          query: {
            filter: ([n]) => slate.Text.isText(n)
          }
        });
      }

      arr.push(child);
    } else {
      arr.push(slateHyperscript.jsx('text', leaf, child));
    }

    return arr;
  }, []);
};

/**
 * Deserialize HTML text node to text.
 */
const deserializeHTMLToText = node => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.nodeValue === '\n' ? null : node.textContent;
  }
};

/**
 * Deserialize HTML element or child node.
 */

const deserializeHTMLNode = (editor, plugins) => node => {
  var _node$childNodes$;

  // text node
  const textNode = deserializeHTMLToText(node);
  if (textNode) return textNode; // if not an element node

  if (node.nodeType !== Node.ELEMENT_NODE) return null;
  const htmlElement = node; // break line

  const breakLine = deserializeHTMLToBreak(node);
  if (breakLine) return breakLine;
  const {
    nodeName
  } = node;
  let parent = node; // blockquote

  if (nodeName === 'PRE' && ((_node$childNodes$ = node.childNodes[0]) === null || _node$childNodes$ === void 0 ? void 0 : _node$childNodes$.nodeName) === 'CODE') {
    [parent] = node.childNodes;
  }

  const children = Array.from(parent.childNodes).map(deserializeHTMLNode(editor, plugins)).flat(); // body

  const fragment = deserializeHTMLToFragment({
    element: htmlElement,
    children
  });
  if (fragment) return fragment; // element

  const element = deserializeHTMLToElement(editor, {
    plugins,
    element: htmlElement,
    children
  });
  if (element) return element; // mark

  return deserializeHTMLToMarks(editor, {
    plugins,
    element: htmlElement,
    children
  });
};

/**
 * Deserialize HTML element.
 */

const deserializeHTMLElement = (editor, {
  plugins,
  element
}) => {
  return deserializeHTMLNode(editor, plugins)(element);
};

/**
 * Deserialize HTML element to a valid document fragment.
 */

const deserializeHTMLToDocumentFragment = (editor, {
  plugins,
  element,
  stripWhitespace = true
}) => {
  if (typeof element === 'string') {
    element = htmlStringToDOMNode(element, stripWhitespace);
  }

  const fragment = deserializeHTMLElement(editor, {
    plugins,
    element
  });
  return plateCommon.normalizeDescendantsToDocumentFragment(editor, {
    descendants: fragment
  });
};

const htmlDeserializerId = 'HTML Deserializer';
/**
 * Enables support for deserializing inserted content from HTML format to Slate format.
 */

const withDeserializeHTML = ({
  plugins = []
} = {}) => editor => {
  const {
    insertData
  } = editor;

  editor.insertData = data => {
    const html = data.getData('text/html');
    const isEnabled = plateSerializer.isDeserializerEnabled(editor, plugins, htmlDeserializerId);

    if (html && isEnabled) {
      const {
        body
      } = new DOMParser().parseFromString(html, 'text/html');
      const fragment = deserializeHTMLToDocumentFragment(editor, {
        plugins,
        element: body
      });

      if (fragment.length) {
        return plateSerializer.insertDeserializedFragment(editor, {
          fragment,
          plugins
        });
      }
    }

    insertData(data);
  };

  return editor;
};
/**
 * @see {@link withDeserializeHTML}
 */

const createDeserializeHTMLPlugin = plateCore.getPlatePluginWithOverrides(withDeserializeHTML);

// Remove extra whitespace generated by ReactDOMServer
const trimWhitespace = rawHtml => rawHtml.replace(/(\r\n|\n|\r|\t)/gm, ''); // Remove redundant data attributes


const stripSlateDataAttributes = rawHtml => rawHtml.replace(/( data-slate)(-node|-type|-leaf)="[^"]+"/gm, '').replace(/( data-testid)="[^"]+"/gm, '');
/**
 * Remove all class names that do not start with one of preserveClassNames (`slate-` by default)
 */


const stripClassNames = (html, {
  preserveClassNames = ['xyz-']
}) => {
  const allClasses = html.split(/(class="[^"]*")/g);
  let filteredHtml = '';
  allClasses.forEach((item, index) => {
    if (index % 2 === 0) {
      return filteredHtml += item;
    }

    const preserveRegExp = new RegExp(preserveClassNames.map(cn => `${cn}[^"\\s]*`).join('|'), 'g');
    const slateClassNames = item.match(preserveRegExp);

    if (slateClassNames) {
      filteredHtml += `class="${slateClassNames.join(' ')}"`;
    }
  });
  return filteredHtml;
};

const getNode = (editor, {
  plugins,
  elementProps,
  slateProps,
  preserveClassNames
}) => {
  // If no type provided we wrap children with div tag
  if (!elementProps.element.type) {
    return `<div>${elementProps.children}</div>`;
  }

  let html;
  const overriders = plugins.flatMap(plugin => {
    var _plugin$overrideProps, _plugin$overrideProps2;

    return (_plugin$overrideProps = (_plugin$overrideProps2 = plugin.overrideProps) === null || _plugin$overrideProps2 === void 0 ? void 0 : _plugin$overrideProps2.call(plugin, editor)) !== null && _plugin$overrideProps !== void 0 ? _plugin$overrideProps : [];
  });
  elementProps = plateCore.pipeOverrideProps(elementProps, overriders); // Search for matching plugin based on element type

  plugins.some(plugin => {
    var _plugin$serialize, _plugin$deserialize, _plugin$deserialize$c, _plugin$serialize$ele, _plugin$serialize2, _plugin$serialize2$el, _plugin$renderElement;

    if (!((_plugin$serialize = plugin.serialize) !== null && _plugin$serialize !== void 0 && _plugin$serialize.element) && !plugin.renderElement) return false;

    if (!((_plugin$deserialize = plugin.deserialize) !== null && _plugin$deserialize !== void 0 && (_plugin$deserialize$c = _plugin$deserialize.call(plugin, editor).element) !== null && _plugin$deserialize$c !== void 0 && _plugin$deserialize$c.some(item => item.type === String(elementProps.element.type)))) {
      html = `<div>${elementProps.children}</div>`;
      return false;
    } // Render element using picked plugins renderElement function and ReactDOM


    html = server.renderToStaticMarkup(plateCommon.createElementWithSlate({ ...slateProps,
      children: (_plugin$serialize$ele = (_plugin$serialize2 = plugin.serialize) === null || _plugin$serialize2 === void 0 ? void 0 : (_plugin$serialize2$el = _plugin$serialize2.element) === null || _plugin$serialize2$el === void 0 ? void 0 : _plugin$serialize2$el.call(_plugin$serialize2, elementProps)) !== null && _plugin$serialize$ele !== void 0 ? _plugin$serialize$ele : (_plugin$renderElement = plugin.renderElement) === null || _plugin$renderElement === void 0 ? void 0 : _plugin$renderElement.call(plugin, editor)(elementProps)
    }));
    html = stripClassNames(html, {
      preserveClassNames
    });
    return true;
  });
  return html;
};

const getLeaf = (editor, {
  plugins,
  leafProps,
  slateProps,
  preserveClassNames
}) => {
  const {
    children
  } = leafProps;
  return plugins.reduce((result, plugin) => {
    var _plugin$serialize3, _plugin$serialize$lea, _plugin$serialize4, _plugin$serialize4$le, _plugin$renderLeaf, _plugin$serialize$lea2, _plugin$serialize5, _plugin$serialize5$le, _plugin$renderLeaf2;

    if (!((_plugin$serialize3 = plugin.serialize) !== null && _plugin$serialize3 !== void 0 && _plugin$serialize3.leaf) && !plugin.renderLeaf) return result;
    if (((_plugin$serialize$lea = (_plugin$serialize4 = plugin.serialize) === null || _plugin$serialize4 === void 0 ? void 0 : (_plugin$serialize4$le = _plugin$serialize4.leaf) === null || _plugin$serialize4$le === void 0 ? void 0 : _plugin$serialize4$le.call(_plugin$serialize4, leafProps)) !== null && _plugin$serialize$lea !== void 0 ? _plugin$serialize$lea : (_plugin$renderLeaf = plugin.renderLeaf) === null || _plugin$renderLeaf === void 0 ? void 0 : _plugin$renderLeaf.call(plugin, editor)(leafProps)) === children) return result;
    const overriders = plugins.flatMap(p => {
      var _p$overrideProps, _p$overrideProps2;

      return (_p$overrideProps = (_p$overrideProps2 = p.overrideProps) === null || _p$overrideProps2 === void 0 ? void 0 : _p$overrideProps2.call(p, editor)) !== null && _p$overrideProps !== void 0 ? _p$overrideProps : [];
    });
    leafProps = { ...plateCore.pipeOverrideProps(leafProps, overriders),
      children: encodeURIComponent(result)
    };
    let html = decodeURIComponent(server.renderToStaticMarkup(plateCommon.createElementWithSlate({ ...slateProps,
      children: (_plugin$serialize$lea2 = (_plugin$serialize5 = plugin.serialize) === null || _plugin$serialize5 === void 0 ? void 0 : (_plugin$serialize5$le = _plugin$serialize5.leaf) === null || _plugin$serialize5$le === void 0 ? void 0 : _plugin$serialize5$le.call(_plugin$serialize5, leafProps)) !== null && _plugin$serialize$lea2 !== void 0 ? _plugin$serialize$lea2 : (_plugin$renderLeaf2 = plugin.renderLeaf) === null || _plugin$renderLeaf2 === void 0 ? void 0 : _plugin$renderLeaf2.call(plugin, editor)(leafProps)
    })));
    html = stripClassNames(html, {
      preserveClassNames
    });
    return html;
  }, children);
};

const isEncoded = (str = '') => {
  try {
    return str !== decodeURIComponent(str);
  } catch (error) {
    return false;
  }
};
/**
 * Convert Slate Nodes into HTML string
 */


const serializeHTMLFromNodes = (editor, {
  plugins,
  nodes,
  slateProps,
  stripDataAttributes = true,
  preserveClassNames,
  stripWhitespace = true
}) => {
  let result = nodes.map(node => {
    if (slate.Text.isText(node)) {
      return getLeaf(editor, {
        plugins,
        leafProps: {
          leaf: node,
          text: node,
          children: isEncoded(node.text) ? node.text : encodeURIComponent(node.text),
          attributes: {
            'data-slate-leaf': true
          }
        },
        slateProps,
        preserveClassNames
      });
    }

    return getNode(editor, {
      plugins,
      elementProps: {
        element: node,
        children: encodeURIComponent(serializeHTMLFromNodes(editor, {
          plugins,
          nodes: node.children,
          preserveClassNames,
          stripWhitespace
        })),
        attributes: {
          'data-slate-node': 'element',
          ref: null
        }
      },
      slateProps,
      preserveClassNames
    });
  }).join('');

  if (isEncoded(result)) {
    result = decodeURIComponent(result);
  }

  if (stripWhitespace) {
    result = trimWhitespace(result);
  }

  if (stripDataAttributes) {
    result = stripSlateDataAttributes(result);
  }

  return result;
};

exports.createDeserializeHTMLPlugin = createDeserializeHTMLPlugin;
exports.deserializeHTMLElement = deserializeHTMLElement;
exports.deserializeHTMLNode = deserializeHTMLNode;
exports.deserializeHTMLToBreak = deserializeHTMLToBreak;
exports.deserializeHTMLToDocumentFragment = deserializeHTMLToDocumentFragment;
exports.deserializeHTMLToElement = deserializeHTMLToElement;
exports.deserializeHTMLToFragment = deserializeHTMLToFragment;
exports.deserializeHTMLToMarks = deserializeHTMLToMarks;
exports.deserializeHTMLToText = deserializeHTMLToText;
exports.htmlDeserializerId = htmlDeserializerId;
exports.htmlStringToDOMNode = htmlStringToDOMNode;
exports.serializeHTMLFromNodes = serializeHTMLFromNodes;
exports.withDeserializeHTML = withDeserializeHTML;
//# sourceMappingURL=index.js.map
