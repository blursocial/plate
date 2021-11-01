'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateStyledComponents = require('@udecode/plate-styled-components');
var _styled = require('styled-components');
var React = require('react');
var TextareaAutosize = require('react-textarea-autosize');
var plateCommon = require('@udecode/plate-common');
var plateCore = require('@udecode/plate-core');
var reResizable = require('re-resizable');
var slate = require('slate');
var slateReact = require('slate-react');
var plateImage = require('@udecode/plate-image');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var TextareaAutosize__default = /*#__PURE__*/_interopDefaultLegacy(TextareaAutosize);

const getImageElementStyles = props => {
  const {
    focused,
    selected,
    align,
    caption = {
      align: 'center'
    }
  } = props;
  const handle = [{
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "position": "absolute",
    "userSelect": "none"
  }, {
    "width": "1.5rem",
    "height": "100%",
    "top": "0px",
    "zIndex": "10"
  }, _styled.css(["::after{", ";", ";", ";", ";", ";content:' ';width:3px;height:64px;border-radius:6px;}:hover,:focus,:active{::after{", ";}}"], {
    "opacity": "0"
  }, focused && selected && {
    "opacity": "1"
  }, {
    ".group:hover &": {
      "opacity": "1"
    }
  }, {
    "display": "flex"
  }, {
    "--tw-bg-opacity": "1",
    "backgroundColor": "rgba(156, 163, 175, var(--tw-bg-opacity))"
  }, {
    "--tw-bg-opacity": "1",
    "backgroundColor": "rgba(59, 130, 246, var(--tw-bg-opacity))"
  })];
  return plateStyledComponents.createStyles({
    prefixClassNames: 'ImageElement',
    ...props
  }, {
    root: [{
      "paddingTop": "0.625rem",
      "paddingBottom": "0.625rem"
    }],
    resizable: [align === 'center' && {
      "marginLeft": "auto",
      "marginRight": "auto"
    }, align === 'right' && {
      "marginLeft": "auto"
    }],
    figure: [{
      "margin": "0px",
      "position": "relative"
    }],
    img: [{
      "display": "block",
      "maxWidth": "100%",
      "paddingLeft": "0px",
      "paddingRight": "0px",
      "cursor": "pointer",
      "width": "100%"
    }, {
      "borderRadius": "3px",
      "objectFit": "cover"
    }, focused && selected && {
      "boxShadow": "0 0 0 1px rgb(59,130,249)"
    }],
    figcaption: [align === 'center' && {
      "marginLeft": "auto",
      "marginRight": "auto"
    }, align === 'right' && {
      "marginLeft": "auto"
    }],
    caption: [{
      "width": "100%",
      "borderStyle": "none",
      ":focus": {
        "outline": "2px solid transparent",
        "outlineOffset": "2px"
      },
      "marginTop": "0.5rem",
      "padding": "0px",
      "resize": "none"
    }, (caption === null || caption === void 0 ? void 0 : caption.align) === 'center' && {
      "textAlign": "center"
    }, (caption === null || caption === void 0 ? void 0 : caption.align) === 'right' && {
      "textAlign": "right"
    }, _styled.css(["font:inherit;color:inherit;background-color:inherit;:focus{::placeholder{opacity:0;}}"])],
    handleLeft: [...handle, {
      "left": "-0.75rem",
      "marginLeft": "-0.75rem",
      "paddingLeft": "0.75rem"
    }],
    handleRight: [...handle, {
      "alignItems": "flex-end",
      "right": "-0.75rem",
      "marginRight": "-0.75rem",
      "paddingRight": "0.75rem"
    }]
  });
};

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

const ImageHandle = props => /*#__PURE__*/React__default['default'].createElement("div", props);

//   createHistoryPlugin(),
//   createReactPlugin(),
//   createSingleLinePlugin(),
// ];

const ImageElement = props => {
  var _styles$figure, _styles$figure2, _styles$resizable, _styles$handleLeft, _styles$handleLeft2, _styles$handleRight, _styles$handleRight2, _styles$resizable2, _styles$img, _styles$img2, _styles$figcaption, _styles$figcaption2, _styles$caption, _styles$caption2;

  const {
    attributes,
    children,
    element,
    nodeProps,
    styles: _styles,
    classNames,
    prefixClassNames,
    caption = {},
    resizableProps = {
      minWidth: 92
    },
    align = 'center',
    draggable,
    ...rootProps
  } = props;
  const {
    placeholder = 'Write a caption...'
  } = caption;
  const {
    url,
    width: nodeWidth = '100%',
    caption: nodeCaption = [{
      children: [{
        text: ''
      }]
    }]
  } = element;
  const focused = slateReact.useFocused();
  const selected = slateReact.useSelected();
  const editor = plateCore.useEditorRef();
  const [width, setWidth] = React.useState(nodeWidth); // const [captionId] = useState(nanoid());

  React.useEffect(() => {
    setWidth(nodeWidth);
  }, [nodeWidth]);
  const styles = getImageElementStyles({ ...props,
    align,
    focused,
    selected
  });
  const setNodeWidth = React.useCallback(w => {
    const path = slateReact.ReactEditor.findPath(editor, element);

    if (w === nodeWidth) {
      // Focus the node if not resized
      slate.Transforms.select(editor, path);
    } else {
      plateCommon.setNodes(editor, {
        width: w
      }, {
        at: path
      });
    }
  }, [editor, element, nodeWidth]);
  const onChangeCaption = React.useCallback(e => {
    const path = slateReact.ReactEditor.findPath(editor, element);
    plateCommon.setNodes(editor, {
      caption: [{
        text: e.target.value
      }]
    }, {
      at: path
    });
  }, [editor, element]);
  const captionString = React.useMemo(() => {
    return slate.Node.string(nodeCaption[0]) || '';
  }, [nodeCaption]);
  return /*#__PURE__*/React__default['default'].createElement(_StyledDiv, _extends({}, attributes, {
    className: styles.root.className
  }, rootProps, nodeProps, {
    $_css: styles.root.css
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    contentEditable: false
  }, /*#__PURE__*/React__default['default'].createElement(_StyledFigure, {
    className: `group ${(_styles$figure = styles.figure) === null || _styles$figure === void 0 ? void 0 : _styles$figure.className}`,
    $_css2: (_styles$figure2 = styles.figure) === null || _styles$figure2 === void 0 ? void 0 : _styles$figure2.css
  }, /*#__PURE__*/React__default['default'].createElement(_StyledResizable, _extends({
    className: (_styles$resizable = styles.resizable) === null || _styles$resizable === void 0 ? void 0 : _styles$resizable.className,
    size: {
      width,
      height: '100%'
    },
    maxWidth: "100%",
    lockAspectRatio: true,
    resizeRatio: align === 'center' ? 2 : 1,
    enable: {
      left: ['center', 'left'].includes(align),
      right: ['center', 'right'].includes(align)
    },
    handleComponent: {
      left: /*#__PURE__*/React__default['default'].createElement(_StyledImageHandle, {
        className: (_styles$handleLeft = styles.handleLeft) === null || _styles$handleLeft === void 0 ? void 0 : _styles$handleLeft.className,
        $_css4: [(_styles$handleLeft2 = styles.handleLeft) === null || _styles$handleLeft2 === void 0 ? void 0 : _styles$handleLeft2.css]
      }),
      right: /*#__PURE__*/React__default['default'].createElement(_StyledImageHandle2, {
        className: (_styles$handleRight = styles.handleRight) === null || _styles$handleRight === void 0 ? void 0 : _styles$handleRight.className,
        $_css5: (_styles$handleRight2 = styles.handleRight) === null || _styles$handleRight2 === void 0 ? void 0 : _styles$handleRight2.css
      })
    },
    handleStyles: {
      left: {
        left: 0
      },
      right: {
        right: 0
      }
    },
    onResize: (e, direction, ref) => {
      setWidth(ref.offsetWidth);
    },
    onResizeStop: (e, direction, ref) => setNodeWidth(ref.offsetWidth)
  }, resizableProps, {
    $_css3: (_styles$resizable2 = styles.resizable) === null || _styles$resizable2 === void 0 ? void 0 : _styles$resizable2.css
  }), /*#__PURE__*/React__default['default'].createElement(_StyledImg, _extends({
    "data-testid": "ImageElementImage",
    className: (_styles$img = styles.img) === null || _styles$img === void 0 ? void 0 : _styles$img.className,
    src: url,
    alt: captionString,
    draggable: draggable
  }, nodeProps, {
    $_css6: (_styles$img2 = styles.img) === null || _styles$img2 === void 0 ? void 0 : _styles$img2.css
  }))), !caption.disabled && (captionString.length || selected) && /*#__PURE__*/React__default['default'].createElement(_StyledFigcaption, {
    style: {
      width
    },
    className: (_styles$figcaption = styles.figcaption) === null || _styles$figcaption === void 0 ? void 0 : _styles$figcaption.className,
    $_css7: (_styles$figcaption2 = styles.figcaption) === null || _styles$figcaption2 === void 0 ? void 0 : _styles$figcaption2.css
  }, /*#__PURE__*/React__default['default'].createElement(_StyledTextareaAutosize, {
    className: (_styles$caption = styles.caption) === null || _styles$caption === void 0 ? void 0 : _styles$caption.className,
    value: nodeCaption[0].text,
    placeholder: placeholder,
    onChange: onChangeCaption,
    $_css8: (_styles$caption2 = styles.caption) === null || _styles$caption2 === void 0 ? void 0 : _styles$caption2.css
  })))), children);
};

var _StyledDiv = _styled__default['default']("div").withConfig({
  displayName: "ImageElement___StyledDiv",
  componentId: "sc-bie0hf-0"
})(["", ""], p => p.$_css);

var _StyledFigure = _styled__default['default']("figure").withConfig({
  displayName: "ImageElement___StyledFigure",
  componentId: "sc-bie0hf-1"
})(["", ""], p => p.$_css2);

var _StyledResizable = _styled__default['default'](reResizable.Resizable).withConfig({
  displayName: "ImageElement___StyledResizable",
  componentId: "sc-bie0hf-2"
})(["", ""], p => p.$_css3);

var _StyledImageHandle = _styled__default['default'](ImageHandle).withConfig({
  displayName: "ImageElement___StyledImageHandle",
  componentId: "sc-bie0hf-3"
})(["", ""], p => p.$_css4);

var _StyledImageHandle2 = _styled__default['default'](ImageHandle).withConfig({
  displayName: "ImageElement___StyledImageHandle2",
  componentId: "sc-bie0hf-4"
})(["", ""], p => p.$_css5);

var _StyledImg = _styled__default['default']("img").withConfig({
  displayName: "ImageElement___StyledImg",
  componentId: "sc-bie0hf-5"
})(["", ""], p => p.$_css6);

var _StyledFigcaption = _styled__default['default']("figcaption").withConfig({
  displayName: "ImageElement___StyledFigcaption",
  componentId: "sc-bie0hf-6"
})(["", ""], p => p.$_css7);

var _StyledTextareaAutosize = _styled__default['default'](TextareaAutosize__default['default']).withConfig({
  displayName: "ImageElement___StyledTextareaAutosize",
  componentId: "sc-bie0hf-7"
})(["", ""], p => p.$_css8);

const ToolbarImage = ({
  uploadedImgUrl,
  ...props
}) => {
  const editor = plateCore.useStoreEditorRef(plateCore.useEventEditorId('focus'));

  const handleUploadImage = async e => {
    const formData = new FormData();
    formData.append('File', e.currentTarget.files[0]);
    const res = await fetch('/api/file/uploadFile', {
      method: 'POST',
      body: formData
    });
    const resJson = await res.json();
    return `https://blur-image.sfo3.digitaloceanspaces.com/${resJson.image}`;
  };

  let url;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("input", _extends({
    type: "file",
    accept: "image/*",
    onChange: async e => {
      if (!editor) return;
      e.preventDefault();
      url = await handleUploadImage(e);
      if (!url) return;
      plateImage.insertImage(editor, url);
    }
  }, props)));
};

exports.ImageElement = ImageElement;
exports.ImageHandle = ImageHandle;
exports.ToolbarImage = ToolbarImage;
exports.getImageElementStyles = getImageElementStyles;
//# sourceMappingURL=index.js.map
