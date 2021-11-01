'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateStyledComponents = require('@udecode/plate-styled-components');
var _styled = require('styled-components');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const getBlockquoteElementStyles = props => plateStyledComponents.createStyles({
  prefixClassNames: 'BlockquoteElement',
  ...props
}, {
  root: [{
    "marginTop": "0.5rem",
    "marginBottom": "0.5rem",
    "marginLeft": "0px",
    "marginRight": "0px"
  }, _styled.css(["border-left:2px solid #ddd;padding:10px 20px 10px 16px;color:#aaa;"])]
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

const BlockquoteElement = props => {
  const {
    attributes,
    children,
    nodeProps,
    styles,
    element,
    classNames,
    prefixClassNames,
    ...rootProps
  } = props;
  const {
    root
  } = getBlockquoteElementStyles(props);
  return /*#__PURE__*/React__default['default'].createElement(_StyledBlockquote, _extends({}, attributes, {
    className: root.className
  }, rootProps, nodeProps, {
    $_css: root.css
  }), children);
};

var _StyledBlockquote = _styled__default['default']("blockquote").withConfig({
  displayName: "BlockquoteElement___StyledBlockquote",
  componentId: "sc-ifel8n-0"
})(["", ""], p => p.$_css);

exports.BlockquoteElement = BlockquoteElement;
exports.getBlockquoteElementStyles = getBlockquoteElementStyles;
//# sourceMappingURL=index.js.map
