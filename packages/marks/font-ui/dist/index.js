'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _styled = require('styled-components');
var React = require('react');
var plateCommon = require('@udecode/plate-common');
var plateCore = require('@udecode/plate-core');
var plateToolbar = require('@udecode/plate-toolbar');
var slate = require('slate');
var slateReact = require('slate-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ColorPicker = ({
  color,
  updateColor
}) => {
  return /*#__PURE__*/React__default['default'].createElement(_StyledDiv, null, /*#__PURE__*/React__default['default'].createElement("input", {
    type: "color",
    onChange: ev => updateColor(ev, ev.target.value),
    value: color || '#000000'
  }));
};

var _StyledDiv = _styled__default['default']("div").withConfig({
  displayName: "ColorPicker___StyledDiv",
  componentId: "sc-swnf2m-0"
})({
  "display": "flex"
});

const ToolbarColorPicker = ({
  pluginKey,
  icon
}) => {
  const editor = plateCore.useStoreEditorState(plateCore.useEventEditorId('focus'));
  const editorRef = plateCore.useStoreEditorRef(plateCore.useEventEditorId('focus'));
  const selection = plateCore.useStoreEditorSelection(plateCore.useEventEditorId('focus'));
  const type = plateCore.getPlatePluginType(editor, pluginKey);
  const color = editorRef && plateCommon.getMark(editorRef, type);
  const [selectedColor, setSelectedColor] = React.useState();
  const latestSelection = React.useRef();
  const updateColor = React.useCallback((ev, colorParam) => {
    setSelectedColor(colorParam);
  }, []);
  React.useEffect(() => {
    if (selection) {
      latestSelection.current = selection;
      setSelectedColor(color);
    }
  }, [color, selection]);
  return /*#__PURE__*/React__default['default'].createElement(plateToolbar.ToolbarDropdown, {
    control: /*#__PURE__*/React__default['default'].createElement(plateToolbar.ToolbarButton, {
      active: !!(editor !== null && editor !== void 0 && editor.selection) && plateCommon.isMarkActive(editor, type),
      icon: icon
    }),
    onClose: e => {
      if (editorRef && editor && latestSelection.current) {
        e.preventDefault();
        slate.Transforms.select(editorRef, latestSelection.current);
        slateReact.ReactEditor.focus(editorRef);

        if (selectedColor) {
          plateCommon.setMarks(editor, {
            [type]: selectedColor
          });
        }
      }
    }
  }, /*#__PURE__*/React__default['default'].createElement(ColorPicker, {
    color: selectedColor || color,
    updateColor: updateColor
  }));
};

exports.ColorPicker = ColorPicker;
exports.ToolbarColorPicker = ToolbarColorPicker;
//# sourceMappingURL=index.js.map
