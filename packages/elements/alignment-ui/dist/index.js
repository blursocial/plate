'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var plateAlignment = require('@udecode/plate-alignment');
var plateCommon = require('@udecode/plate-common');
var plateCore = require('@udecode/plate-core');
var plateToolbar = require('@udecode/plate-toolbar');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

const ToolbarAlign = ({
  align,
  ...props
}) => {
  const editor = plateCore.useStoreEditorState(plateCore.useEventEditorId('focus'));
  return /*#__PURE__*/React__default['default'].createElement(plateToolbar.ToolbarButton, _extends({
    active: plateCommon.isCollapsed(editor === null || editor === void 0 ? void 0 : editor.selection) && plateCommon.someNode(editor, {
      match: {
        align
      }
    }),
    onMouseDown: editor ? plateCommon.getPreventDefaultHandler(plateAlignment.setAlign, editor, {
      align
    }) : undefined
  }, props));
};

exports.ToolbarAlign = ToolbarAlign;
//# sourceMappingURL=index.js.map
