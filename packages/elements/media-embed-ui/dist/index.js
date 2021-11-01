'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateStyledComponents = require('@udecode/plate-styled-components');
var _styled = require('styled-components');
var React = require('react');
var plateCommon = require('@udecode/plate-common');
var plateCore = require('@udecode/plate-core');
var slateReact = require('slate-react');
var plateMediaEmbed = require('@udecode/plate-media-embed');
var plateToolbar = require('@udecode/plate-toolbar');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const getMediaEmbedElementStyles = props => plateStyledComponents.createStyles({
  prefixClassNames: 'MediaEmbedElement',
  ...props
}, {
  root: {
    "position": "relative"
  },
  iframeWrapper: [{
    "position": "relative"
  }, {
    "padding": "75% 0 0 0"
  }],
  iframe: [{
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "width": "100%",
    "height": "100%"
  }],
  input: [{
    "width": "100%"
  }, _styled.css(["padding:0.5em;font-size:0.85em;border:2px solid #ddd;background:#fafafa;margin-top:5px;"])]
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

const MediaEmbedUrlInput = ({
  url,
  onChange,
  ...props
}) => {
  const [value, setValue] = React__default['default'].useState(url);

  const validateUrl = newUrl => {
    // if not starting with http, assume pasting of full iframe embed code
    if (newUrl.substring(0, 4) !== 'http') {
      var _newUrl$match, _src$match;

      const regexMatchSrc = /src=".*?"/;
      const regexGroupQuotes = /"([^"]*)"/;
      const src = (_newUrl$match = newUrl.match(regexMatchSrc)) === null || _newUrl$match === void 0 ? void 0 : _newUrl$match[0];
      const returnString = src === null || src === void 0 ? void 0 : (_src$match = src.match(regexGroupQuotes)) === null || _src$match === void 0 ? void 0 : _src$match[1];

      if (returnString) {
        newUrl = returnString;
      }
    }

    return newUrl;
  };

  return /*#__PURE__*/React__default['default'].createElement("input", _extends({
    value: value,
    onClick: e => e.stopPropagation(),
    onChange: e => {
      const newUrl = e.target.value;
      validateUrl(newUrl);
      setValue(newUrl);
      onChange(newUrl);
    }
  }, props));
};

const MediaEmbedElement = props => {
  var _styles$iframeWrapper, _styles$iframeWrapper2, _styles$iframe, _styles$iframe2, _styles$input, _styles$input2;

  const {
    attributes,
    children,
    nodeProps,
    styles: _styles,
    element,
    classNames,
    prefixClassNames,
    ...rootProps
  } = props;
  const editor = plateCore.useEditorRef();
  const {
    url
  } = element;
  const querySeparator = url.includes('?') ? '' : '?';
  const styles = getMediaEmbedElementStyles(props);
  return /*#__PURE__*/React__default['default'].createElement(_StyledDiv, _extends({}, attributes, {
    className: styles.root.className
  }, rootProps, {
    $_css: styles.root.css
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    contentEditable: false
  }, /*#__PURE__*/React__default['default'].createElement(_StyledDiv2, {
    className: (_styles$iframeWrapper = styles.iframeWrapper) === null || _styles$iframeWrapper === void 0 ? void 0 : _styles$iframeWrapper.className,
    $_css2: (_styles$iframeWrapper2 = styles.iframeWrapper) === null || _styles$iframeWrapper2 === void 0 ? void 0 : _styles$iframeWrapper2.css
  }, /*#__PURE__*/React__default['default'].createElement(_StyledIframe, _extends({
    className: (_styles$iframe = styles.iframe) === null || _styles$iframe === void 0 ? void 0 : _styles$iframe.className,
    title: "embed",
    src: `${url}${querySeparator}&title=0&byline=0&portrait=0`,
    frameBorder: "0"
  }, nodeProps, {
    $_css3: (_styles$iframe2 = styles.iframe) === null || _styles$iframe2 === void 0 ? void 0 : _styles$iframe2.css
  }))), /*#__PURE__*/React__default['default'].createElement(_StyledMediaEmbedUrlInput, {
    "data-testid": "MediaEmbedUrlInput",
    className: (_styles$input = styles.input) === null || _styles$input === void 0 ? void 0 : _styles$input.className,
    url: url,
    onChange: val => {
      const path = slateReact.ReactEditor.findPath(editor, element);
      plateCommon.setNodes(editor, {
        url: val
      }, {
        at: path
      });
    },
    $_css4: (_styles$input2 = styles.input) === null || _styles$input2 === void 0 ? void 0 : _styles$input2.css
  })), children);
};

var _StyledDiv = _styled__default['default']("div").withConfig({
  displayName: "MediaEmbedElement___StyledDiv",
  componentId: "sc-14crjxm-0"
})(["", ""], p => p.$_css);

var _StyledDiv2 = _styled__default['default']("div").withConfig({
  displayName: "MediaEmbedElement___StyledDiv2",
  componentId: "sc-14crjxm-1"
})(["", ""], p => p.$_css2);

var _StyledIframe = _styled__default['default']("iframe").withConfig({
  displayName: "MediaEmbedElement___StyledIframe",
  componentId: "sc-14crjxm-2"
})(["", ""], p => p.$_css3);

var _StyledMediaEmbedUrlInput = _styled__default['default'](MediaEmbedUrlInput).withConfig({
  displayName: "MediaEmbedElement___StyledMediaEmbedUrlInput",
  componentId: "sc-14crjxm-3"
})(["", ""], p => p.$_css4);

const ToolbarMediaEmbed = ({
  getEmbedUrl,
  ...props
}) => {
  const editor = plateCore.useStoreEditorRef(plateCore.useEventEditorId('focus'));
  return /*#__PURE__*/React__default['default'].createElement(plateToolbar.ToolbarButton, _extends({
    onMouseDown: async event => {
      if (!editor) return;
      event.preventDefault();
      let url;

      if (getEmbedUrl) {
        url = await getEmbedUrl();
      } else {
        url = window.prompt('Enter the URL of the embed:');
      }

      if (!url) return;
      plateMediaEmbed.insertMediaEmbed(editor, {
        url
      });
    }
  }, props));
};

exports.MediaEmbedElement = MediaEmbedElement;
exports.MediaEmbedUrlInput = MediaEmbedUrlInput;
exports.ToolbarMediaEmbed = ToolbarMediaEmbed;
exports.getMediaEmbedElementStyles = getMediaEmbedElementStyles;
//# sourceMappingURL=index.js.map
