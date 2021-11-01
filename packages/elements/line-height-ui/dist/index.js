'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var plateCommon = require('@udecode/plate-common');
var plateCore = require('@udecode/plate-core');
var plateLineHeight = require('@udecode/plate-line-height');
var plateToolbar = require('@udecode/plate-toolbar');
var slateReact = require('slate-react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

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

const ToolbarLineHeight = props => {
  const editor = plateCore.useStoreEditorState(plateCore.useEventEditorId('focus'));
  const {
    lineHeights
  } = plateCore.getPlatePluginOptions(editor, plateLineHeight.KEY_LINE_HEIGHT);
  const selectHandler = React.useCallback(lineHeight => {
    if (editor) {
      slateReact.ReactEditor.focus(editor);
      plateLineHeight.setLineHeight(editor, {
        lineHeight
      });
    }
  }, [editor]);
  return /*#__PURE__*/React__namespace.createElement(plateToolbar.ToolbarDropdown, {
    control: /*#__PURE__*/React__namespace.createElement(plateToolbar.ToolbarButton, _extends({
      active: plateCommon.isCollapsed(editor === null || editor === void 0 ? void 0 : editor.selection) && plateCommon.someNode(editor, {
        match: n => n.lineHeight !== undefined
      })
    }, props))
  }, lineHeights && lineHeights.map(lineHeight => /*#__PURE__*/React__namespace.createElement("div", {
    style: {
      cursor: 'pointer'
    },
    key: lineHeight,
    onClick: () => selectHandler(lineHeight)
  }, lineHeight)));
};

exports.ToolbarLineHeight = ToolbarLineHeight;
//# sourceMappingURL=index.js.map
