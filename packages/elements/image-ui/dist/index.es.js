import { createStyles } from '@udecode/plate-styled-components';
import _styled, { css } from 'styled-components';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { setNodes } from '@udecode/plate-common';
import { useEditorRef, useStoreEditorRef, useEventEditorId } from '@udecode/plate-core';
import { Resizable } from 're-resizable';
import { Transforms, Node } from 'slate';
import { useFocused, useSelected, ReactEditor } from 'slate-react';
import { insertImage } from '@udecode/plate-image';

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
  }, css(["::after{", ";", ";", ";", ";", ";content:' ';width:3px;height:64px;border-radius:6px;}:hover,:focus,:active{::after{", ";}}"], {
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
  return createStyles({
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
    }, css(["font:inherit;color:inherit;background-color:inherit;:focus{::placeholder{opacity:0;}}"])],
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

const ImageHandle = props => /*#__PURE__*/React.createElement("div", props);

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
  const focused = useFocused();
  const selected = useSelected();
  const editor = useEditorRef();
  const [width, setWidth] = useState(nodeWidth); // const [captionId] = useState(nanoid());

  useEffect(() => {
    setWidth(nodeWidth);
  }, [nodeWidth]);
  const styles = getImageElementStyles({ ...props,
    align,
    focused,
    selected
  });
  const setNodeWidth = useCallback(w => {
    const path = ReactEditor.findPath(editor, element);

    if (w === nodeWidth) {
      // Focus the node if not resized
      Transforms.select(editor, path);
    } else {
      setNodes(editor, {
        width: w
      }, {
        at: path
      });
    }
  }, [editor, element, nodeWidth]);
  const onChangeCaption = useCallback(e => {
    const path = ReactEditor.findPath(editor, element);
    setNodes(editor, {
      caption: [{
        text: e.target.value
      }]
    }, {
      at: path
    });
  }, [editor, element]);
  const captionString = useMemo(() => {
    return Node.string(nodeCaption[0]) || '';
  }, [nodeCaption]);
  return /*#__PURE__*/React.createElement(_StyledDiv, _extends({}, attributes, {
    className: styles.root.className
  }, rootProps, nodeProps, {
    $_css: styles.root.css
  }), /*#__PURE__*/React.createElement("div", {
    contentEditable: false
  }, /*#__PURE__*/React.createElement(_StyledFigure, {
    className: `group ${(_styles$figure = styles.figure) === null || _styles$figure === void 0 ? void 0 : _styles$figure.className}`,
    $_css2: (_styles$figure2 = styles.figure) === null || _styles$figure2 === void 0 ? void 0 : _styles$figure2.css
  }, /*#__PURE__*/React.createElement(_StyledResizable, _extends({
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
      left: /*#__PURE__*/React.createElement(_StyledImageHandle, {
        className: (_styles$handleLeft = styles.handleLeft) === null || _styles$handleLeft === void 0 ? void 0 : _styles$handleLeft.className,
        $_css4: [(_styles$handleLeft2 = styles.handleLeft) === null || _styles$handleLeft2 === void 0 ? void 0 : _styles$handleLeft2.css]
      }),
      right: /*#__PURE__*/React.createElement(_StyledImageHandle2, {
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
  }), /*#__PURE__*/React.createElement(_StyledImg, _extends({
    "data-testid": "ImageElementImage",
    className: (_styles$img = styles.img) === null || _styles$img === void 0 ? void 0 : _styles$img.className,
    src: url,
    alt: captionString,
    draggable: draggable
  }, nodeProps, {
    $_css6: (_styles$img2 = styles.img) === null || _styles$img2 === void 0 ? void 0 : _styles$img2.css
  }))), !caption.disabled && (captionString.length || selected) && /*#__PURE__*/React.createElement(_StyledFigcaption, {
    style: {
      width
    },
    className: (_styles$figcaption = styles.figcaption) === null || _styles$figcaption === void 0 ? void 0 : _styles$figcaption.className,
    $_css7: (_styles$figcaption2 = styles.figcaption) === null || _styles$figcaption2 === void 0 ? void 0 : _styles$figcaption2.css
  }, /*#__PURE__*/React.createElement(_StyledTextareaAutosize, {
    className: (_styles$caption = styles.caption) === null || _styles$caption === void 0 ? void 0 : _styles$caption.className,
    value: nodeCaption[0].text,
    placeholder: placeholder,
    onChange: onChangeCaption,
    $_css8: (_styles$caption2 = styles.caption) === null || _styles$caption2 === void 0 ? void 0 : _styles$caption2.css
  })))), children);
};

var _StyledDiv = _styled("div").withConfig({
  displayName: "ImageElement___StyledDiv",
  componentId: "sc-bie0hf-0"
})(["", ""], p => p.$_css);

var _StyledFigure = _styled("figure").withConfig({
  displayName: "ImageElement___StyledFigure",
  componentId: "sc-bie0hf-1"
})(["", ""], p => p.$_css2);

var _StyledResizable = _styled(Resizable).withConfig({
  displayName: "ImageElement___StyledResizable",
  componentId: "sc-bie0hf-2"
})(["", ""], p => p.$_css3);

var _StyledImageHandle = _styled(ImageHandle).withConfig({
  displayName: "ImageElement___StyledImageHandle",
  componentId: "sc-bie0hf-3"
})(["", ""], p => p.$_css4);

var _StyledImageHandle2 = _styled(ImageHandle).withConfig({
  displayName: "ImageElement___StyledImageHandle2",
  componentId: "sc-bie0hf-4"
})(["", ""], p => p.$_css5);

var _StyledImg = _styled("img").withConfig({
  displayName: "ImageElement___StyledImg",
  componentId: "sc-bie0hf-5"
})(["", ""], p => p.$_css6);

var _StyledFigcaption = _styled("figcaption").withConfig({
  displayName: "ImageElement___StyledFigcaption",
  componentId: "sc-bie0hf-6"
})(["", ""], p => p.$_css7);

var _StyledTextareaAutosize = _styled(TextareaAutosize).withConfig({
  displayName: "ImageElement___StyledTextareaAutosize",
  componentId: "sc-bie0hf-7"
})(["", ""], p => p.$_css8);

const ToolbarImage = ({
  uploadedImgUrl,
  ...props
}) => {
  const editor = useStoreEditorRef(useEventEditorId('focus'));

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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", _extends({
    type: "file",
    accept: "image/*",
    onChange: async e => {
      if (!editor) return;
      e.preventDefault();
      url = await handleUploadImage(e);
      if (!url) return;
      insertImage(editor, url);
    }
  }, props)));
};

export { ImageElement, ImageHandle, ToolbarImage, getImageElementStyles };
//# sourceMappingURL=index.es.js.map
