import * as React from 'react';
import { useCallback } from 'react';
import { isCollapsed, someNode } from '@udecode/plate-common';
import { useStoreEditorState, useEventEditorId, getPlatePluginOptions } from '@udecode/plate-core';
import { KEY_LINE_HEIGHT, setLineHeight } from '@udecode/plate-line-height';
import { ToolbarDropdown, ToolbarButton } from '@udecode/plate-toolbar';
import { ReactEditor } from 'slate-react';

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
  const editor = useStoreEditorState(useEventEditorId('focus'));
  const {
    lineHeights
  } = getPlatePluginOptions(editor, KEY_LINE_HEIGHT);
  const selectHandler = useCallback(lineHeight => {
    if (editor) {
      ReactEditor.focus(editor);
      setLineHeight(editor, {
        lineHeight
      });
    }
  }, [editor]);
  return /*#__PURE__*/React.createElement(ToolbarDropdown, {
    control: /*#__PURE__*/React.createElement(ToolbarButton, _extends({
      active: isCollapsed(editor === null || editor === void 0 ? void 0 : editor.selection) && someNode(editor, {
        match: n => n.lineHeight !== undefined
      })
    }, props))
  }, lineHeights && lineHeights.map(lineHeight => /*#__PURE__*/React.createElement("div", {
    style: {
      cursor: 'pointer'
    },
    key: lineHeight,
    onClick: () => selectHandler(lineHeight)
  }, lineHeight)));
};

export { ToolbarLineHeight };
//# sourceMappingURL=index.es.js.map
