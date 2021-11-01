'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateStyledComponents = require('@udecode/plate-styled-components');
var _styled = require('styled-components');
var React = require('react');
var plateCommon = require('@udecode/plate-common');
var plateCore = require('@udecode/plate-core');
var plateLink = require('@udecode/plate-link');
var plateToolbar = require('@udecode/plate-toolbar');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const getLinkElementStyles = props => plateStyledComponents.createStyles({
  prefixClassNames: 'LinkElement',
  ...props
}, {
  root: _styled.css(["color:#0078d4;text-decoration:initial;:hover,:visited:hover{color:#004578;text-decoration:underline;}:visited{color:#0078d4;}"])
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

const LinkElement = props => {
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
  const {
    root
  } = getLinkElementStyles(props);
  return /*#__PURE__*/React__default['default'].createElement(_StyledA, _extends({}, attributes, {
    href: element.url,
    className: root.className
  }, rootProps, nodeProps, {
    $_css: root.css
  }), children);
};

var _StyledA = _styled__default['default']("a").withConfig({
  displayName: "LinkElement___StyledA",
  componentId: "sc-1rpm6sw-0"
})(["", ""], p => p.$_css);

const ToolbarLink = ({
  getLinkUrl,
  ...props
}) => {
  const editor = plateCore.useStoreEditorState(plateCore.useEventEditorId('focus'));
  const type = plateCore.getPlatePluginType(editor, plateLink.ELEMENT_LINK);
  const isLink = !!(editor !== null && editor !== void 0 && editor.selection) && plateCommon.someNode(editor, {
    match: {
      type
    }
  });
  return /*#__PURE__*/React__default['default'].createElement(plateToolbar.ToolbarButton, _extends({
    active: isLink,
    onMouseDown: async event => {
      if (!editor) return;
      event.preventDefault();
      plateLink.getAndUpsertLink(editor, getLinkUrl);
    }
  }, props));
};

exports.LinkElement = LinkElement;
exports.ToolbarLink = ToolbarLink;
exports.getLinkElementStyles = getLinkElementStyles;
//# sourceMappingURL=index.js.map
