import React from 'react';
import { setAlign } from '@udecode/plate-alignment';
import { isCollapsed, someNode, getPreventDefaultHandler } from '@udecode/plate-common';
import { useStoreEditorState, useEventEditorId } from '@udecode/plate-core';
import { ToolbarButton } from '@udecode/plate-toolbar';

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
  const editor = useStoreEditorState(useEventEditorId('focus'));
  return /*#__PURE__*/React.createElement(ToolbarButton, _extends({
    active: isCollapsed(editor === null || editor === void 0 ? void 0 : editor.selection) && someNode(editor, {
      match: {
        align
      }
    }),
    onMouseDown: editor ? getPreventDefaultHandler(setAlign, editor, {
      align
    }) : undefined
  }, props));
};

export { ToolbarAlign };
//# sourceMappingURL=index.es.js.map
