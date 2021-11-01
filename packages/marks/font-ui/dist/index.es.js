import _styled from 'styled-components';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { getMark, isMarkActive, setMarks } from '@udecode/plate-common';
import { useStoreEditorState, useEventEditorId, useStoreEditorRef, useStoreEditorSelection, getPlatePluginType } from '@udecode/plate-core';
import { ToolbarDropdown, ToolbarButton } from '@udecode/plate-toolbar';
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

const ColorPicker = ({
  color,
  updateColor
}) => {
  return /*#__PURE__*/React.createElement(_StyledDiv, null, /*#__PURE__*/React.createElement("input", {
    type: "color",
    onChange: ev => updateColor(ev, ev.target.value),
    value: color || '#000000'
  }));
};

var _StyledDiv = _styled("div").withConfig({
  displayName: "ColorPicker___StyledDiv",
  componentId: "sc-swnf2m-0"
})({
  "display": "flex"
});

const ToolbarColorPicker = ({
  pluginKey,
  icon
}) => {
  const editor = useStoreEditorState(useEventEditorId('focus'));
  const editorRef = useStoreEditorRef(useEventEditorId('focus'));
  const selection = useStoreEditorSelection(useEventEditorId('focus'));
  const type = getPlatePluginType(editor, pluginKey);
  const color = editorRef && getMark(editorRef, type);
  const [selectedColor, setSelectedColor] = useState();
  const latestSelection = useRef();
  const updateColor = useCallback((ev, colorParam) => {
    setSelectedColor(colorParam);
  }, []);
  useEffect(() => {
    if (selection) {
      latestSelection.current = selection;
      setSelectedColor(color);
    }
  }, [color, selection]);
  return /*#__PURE__*/React.createElement(ToolbarDropdown, {
    control: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: !!(editor !== null && editor !== void 0 && editor.selection) && isMarkActive(editor, type),
      icon: icon
    }),
    onClose: e => {
      if (editorRef && editor && latestSelection.current) {
        e.preventDefault();
        Transforms.select(editorRef, latestSelection.current);
        ReactEditor.focus(editorRef);

        if (selectedColor) {
          setMarks(editor, {
            [type]: selectedColor
          });
        }
      }
    }
  }, /*#__PURE__*/React.createElement(ColorPicker, {
    color: selectedColor || color,
    updateColor: updateColor
  }));
};

export { ColorPicker, ToolbarColorPicker };
//# sourceMappingURL=index.es.js.map
