'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCore = require('@udecode/plate-core');
var plateCommon = require('@udecode/plate-common');
var plateStyledComponents = require('@udecode/plate-styled-components');
var _styled = require('styled-components');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ELEMENT_EXCALIDRAW = 'excalidraw';

const getExcalidrawDeserialize = (pluginKey = ELEMENT_EXCALIDRAW) => editor => {
  const options = plateCore.getPlatePluginOptions(editor, pluginKey);
  return {
    element: plateCommon.getNodeDeserializer({
      type: options.type,
      getNode: () => {
        // let url = el.getAttribute('src');
        // if (url) {
        //  [url] = url.split('?');
        return {
          type: options.type //  url,

        }; // }
      },
      rules: [{
        className: plateCore.getSlateClass(options.type)
      }],
      ...options.deserialize
    })
  };
};

/**
 * Enables support for Excalidraw drawing tool within a Slate document
 */

const createExcalidrawPlugin = ({
  pluginKey = ELEMENT_EXCALIDRAW
} = {}) => ({
  pluginKeys: pluginKey,
  renderElement: plateCore.getRenderElement(pluginKey),
  deserialize: getExcalidrawDeserialize(pluginKey),
  voidTypes: plateCore.getPlatePluginTypes(pluginKey)
});

const getExcalidrawElementStyles = props => plateStyledComponents.createStyles({
  prefixClassNames: 'ExcalidrawElement',
  ...props
}, {
  excalidrawWrapper: {
    "height": "600px"
  }
});

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

const ExcalidrawElement = props => {
  var _element$data, _element$data2, _styles$excalidrawWra, _styles$excalidrawWra2;

  const {
    attributes,
    children,
    nodeProps,
    element,
    styles: _styles,
    classNames,
    prefixClassNames,
    scrollToContent = true,
    libraryItems = [],
    excalidrawProps: _excalidrawProps,
    ...rootProps
  } = props;
  const [Excalidraw, setExcalidraw] = React.useState(null);
  React.useEffect(() => {
    Promise.resolve().then(() => _interopRequireWildcard(require('@excalidraw/excalidraw-next'))).then(comp => setExcalidraw(comp.default));
  });
  const styles = getExcalidrawElementStyles(props);

  const _excalidrawRef = React.useRef(null); // const editor = useEditorRef();


  const excalidrawProps = {
    excalidrawRef: _excalidrawRef,
    initialData: {
      elements: (_element$data = element.data) === null || _element$data === void 0 ? void 0 : _element$data.elements,
      appState: (_element$data2 = element.data) === null || _element$data2 === void 0 ? void 0 : _element$data2.state,
      scrollToContent,
      libraryItems
    },
    autoFocus: false,
    // onChange: (elements: readonly ExcalidrawElementType[], state: AppState) => {
    // const path = ReactEditor.findPath(editor, element);
    // FIXME: setNodes triggers render loop as onChange is triggered on rerender
    // in the meantime, the prop can be used to save the data outside slate
    // setNodes(editor, { data: { elements, state } }, { at: path });
    // },
    ..._excalidrawProps
  };
  return /*#__PURE__*/React__default['default'].createElement("div", _extends({}, attributes, rootProps), /*#__PURE__*/React__default['default'].createElement("div", {
    contentEditable: false
  }, /*#__PURE__*/React__default['default'].createElement(_StyledDiv, {
    className: (_styles$excalidrawWra = styles.excalidrawWrapper) === null || _styles$excalidrawWra === void 0 ? void 0 : _styles$excalidrawWra.className,
    $_css: (_styles$excalidrawWra2 = styles.excalidrawWrapper) === null || _styles$excalidrawWra2 === void 0 ? void 0 : _styles$excalidrawWra2.css
  }, Excalidraw && /*#__PURE__*/React__default['default'].createElement(Excalidraw, _extends({}, nodeProps, excalidrawProps)))), children);
}; // const ActionButtons = () => (
//   <div className="button-wrapper">
//     <button className="update-scene" onClick={updateScene} type="button">
//       Update Scene
//     </button>
//     <button
//       className="reset-scene"
//       onClick={() => {
//         excalidrawRef?.current!.resetScene();
//       }}
//       type="button"
//     >
//       Reset Scene
//     </button>
//     <label>
//       <input
//         type="checkbox"
//         checked={viewModeEnabled}
//         onChange={() => setViewModeEnabled(!viewModeEnabled)}
//       />
//       View mode
//     </label>
//     <label>
//       <input
//         type="checkbox"
//         checked={zenModeEnabled}
//         onChange={() => setZenModeEnabled(!zenModeEnabled)}
//       />
//       Zen mode
//     </label>
//     <label>
//       <input
//         type="checkbox"
//         checked={gridModeEnabled}
//         onChange={() => setGridModeEnabled(!gridModeEnabled)}
//       />
//       Grid mode
//     </label>
//   </div>
// );
// const ExportButtons = () => (
//   <div className="export-wrapper button-wrapper">
//     <button
//       onClick={() => {
//         const svg = exportToSvg({
//           elements: excalidrawRef.current!.getSceneElements(),
//           appState: {
//             ...initialData.appState,
//           } as any,
//         });
//         document.querySelector('.export-svg')!.innerHTML = svg.outerHTML;
//       }}
//       type="button"
//     >
//       Export to SVG
//     </button>
//     <div className="export export-svg" />
//
//     <button
//       onClick={async () => {
//         const blob = await exportToBlob({
//           elements: excalidrawRef.current!.getSceneElements(),
//           mimeType: 'image/png',
//           appState: {
//             ...initialData.appState,
//           } as any,
//         });
//         setBlobUrl(window.URL.createObjectURL(blob));
//       }}
//       type="button"
//     >
//       Export to Blob
//     </button>
//     <div className="export export-blob">
//       <img src={blobUrl!} alt="" />
//     </div>
//
//     <button
//       onClick={() => {
//         const canvas = exportToCanvas({
//           elements: excalidrawRef.current!.getSceneElements(),
//           appState: {
//             ...initialData.appState,
//           } as any,
//         });
//         setCanvasUrl(canvas.toDataURL());
//       }}
//       type="button"
//     >
//       Export to Canvas
//     </button>
//     <div className="export export-canvas">
//       <img src={canvasUrl!} alt="" />
//     </div>
//   </div>
// );

var _StyledDiv = _styled__default['default']("div").withConfig({
  displayName: "ExcalidrawElement___StyledDiv",
  componentId: "sc-1oq6fmd-0"
})(["", ""], p => p.$_css);

const insertExcalidraw = (editor, {
  pluginKey = ELEMENT_EXCALIDRAW
}) => {
  if (!editor.selection) return;
  const selectionParentEntry = plateCommon.getParent(editor, editor.selection);
  if (!selectionParentEntry) return;
  const [, path] = selectionParentEntry;
  plateCommon.insertNodes(editor, {
    type: pluginKey,
    children: [{
      text: ''
    }]
  }, {
    at: path
  });
};

exports.ELEMENT_EXCALIDRAW = ELEMENT_EXCALIDRAW;
exports.ExcalidrawElement = ExcalidrawElement;
exports.createExcalidrawPlugin = createExcalidrawPlugin;
exports.getExcalidrawDeserialize = getExcalidrawDeserialize;
exports.getExcalidrawElementStyles = getExcalidrawElementStyles;
exports.insertExcalidraw = insertExcalidraw;
//# sourceMappingURL=index.js.map
