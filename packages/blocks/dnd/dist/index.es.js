import { createStyles } from '@udecode/plate-styled-components';
import _styled, { css } from 'styled-components';
import React, { useState, useRef, forwardRef, useMemo } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useEditorRef } from '@udecode/plate-core';
import { useDrag, useDrop } from 'react-dnd';
import { findNode, isExpanded, createNodesWithHOC, getNodes, unhangRange } from '@udecode/plate-common';
import { Path, Transforms, Editor } from 'slate';
import { ReactEditor, useReadOnly } from 'slate-react';

const createDndPlugin = () => ({
  onDrop: editor => () => editor.isDragging
});

const getDraggableStyles = props => createStyles({
  prefixClassNames: 'Draggable',
  ...props
}, {
  root: [{
    "position": "relative"
  }, props.isDragging && {
    "opacity": "0.5"
  }, props.selected && {
    "backgroundColor": "rgb(181, 215, 255)"
  }, css([":hover .slate-Draggable-gutterLeft{", "}"], {
    "opacity": "1"
  })],
  block: {
    "overflow": "auto"
  },
  gutterLeft: [{
    "position": "absolute",
    "top": "0px",
    "display": "flex",
    "height": "100%",
    "opacity": "0"
  }, css(["transform:translateX(-100%);"])],
  blockToolbarWrapper: {
    "display": "flex",
    "height": "1.5em"
  },
  blockToolbar: {
    "display": "flex",
    "alignItems": "center",
    "marginRight": "0.25rem",
    "pointerEvents": "auto"
  },
  dragHandle: [{
    "padding": "0px",
    "backgroundColor": "transparent",
    "backgroundRepeat": "no-repeat",
    "cursor": "pointer",
    "overflow": "hidden",
    "outline": "2px solid transparent",
    "outlineOffset": "2px",
    "borderStyle": "none"
  }, {
    "minWidth": "18px",
    "height": "18px"
  }],
  dropLine: [{
    "position": "absolute",
    "left": "0px",
    "right": "0px",
    "height": "0.125rem",
    "opacity": "1"
  }, {
    "background": "#B4D5FF"
  }, props.direction === 'top' && {
    "top": "-1px"
  }, props.direction === 'bottom' && {
    "bottom": "-1px"
  }]
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

const useDragBlock = (editor, id) => {
  return useDrag(() => ({
    type: 'block',

    item() {
      editor.isDragging = true;
      document.body.classList.add('dragging');
      return {
        id
      };
    },

    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: () => {
      editor.isDragging = false;
      document.body.classList.remove('dragging');
    }
  }), []);
};

/**
 * If dragging a block A over another block B:
 * get the direction of block A relative to block B.
 */
const getHoverDirection = (dragItem, monitor, ref, hoverId) => {
  var _ref$current;

  if (!ref.current) return;
  const dragId = dragItem.id; // Don't replace items with themselves

  if (dragId === hoverId) return; // Determine rectangle on screen

  const hoverBoundingRect = (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect(); // Get vertical middle

  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2; // Determine mouse position

  const clientOffset = monitor.getClientOffset();
  if (!clientOffset) return; // Get pixels to the top

  const hoverClientY = clientOffset.y - hoverBoundingRect.top; // Only perform the move when the mouse has crossed half of the items height
  // When dragging downwards, only move when the cursor is below 50%
  // When dragging upwards, only move when the cursor is above 50%
  // Dragging downwards
  // if (dragId < hoverId && hoverClientY < hoverMiddleY) {

  if (hoverClientY < hoverMiddleY) {
    return 'top';
  } // Dragging upwards
  // if (dragId > hoverId && hoverClientY > hoverMiddleY) {


  if (hoverClientY >= hoverMiddleY) {
    return 'bottom';
  }
};

/**
 * Get new direction if updated
 */
const getNewDirection = (previousDir, dir) => {
  if (!dir && previousDir) {
    return '';
  }

  if (dir === 'top' && previousDir !== 'top') {
    return 'top';
  }

  if (dir === 'bottom' && previousDir !== 'bottom') {
    return 'bottom';
  }
};

const useDropBlockOnEditor = (editor, {
  blockRef,
  id,
  dropLine,
  setDropLine
}) => {
  return useDrop({
    accept: 'block',
    drop: (dragItem, monitor) => {
      const direction = getHoverDirection(dragItem, monitor, blockRef, id);
      if (!direction) return;
      const dragEntry = findNode(editor, {
        at: [],
        match: {
          id: dragItem.id
        }
      });
      if (!dragEntry) return;
      const [, dragPath] = dragEntry;
      ReactEditor.focus(editor);
      let dropPath;

      if (direction === 'bottom') {
        var _findNode;

        dropPath = (_findNode = findNode(editor, {
          at: [],
          match: {
            id
          }
        })) === null || _findNode === void 0 ? void 0 : _findNode[1];
        if (!dropPath) return;
        if (Path.equals(dragPath, Path.next(dropPath))) return;
      }

      if (direction === 'top') {
        var _findNode2;

        const nodePath = (_findNode2 = findNode(editor, {
          at: [],
          match: {
            id
          }
        })) === null || _findNode2 === void 0 ? void 0 : _findNode2[1];
        if (!nodePath) return;
        dropPath = [...nodePath.slice(0, -1), nodePath[nodePath.length - 1] - 1];
        if (Path.equals(dragPath, dropPath)) return;
      }

      if (direction) {
        const _dropPath = dropPath;
        const before = Path.isBefore(dragPath, _dropPath) && Path.isSibling(dragPath, _dropPath);
        const to = before ? _dropPath : Path.next(_dropPath);
        Transforms.moveNodes(editor, {
          at: dragPath,
          to
        });
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    }),

    hover(item, monitor) {
      const direction = getHoverDirection(item, monitor, blockRef, id);
      const dropLineDir = getNewDirection(dropLine, direction);
      if (dropLineDir) setDropLine(dropLineDir);

      if (direction && isExpanded(editor.selection)) {
        ReactEditor.focus(editor);
        Transforms.collapse(editor);
      }
    }

  });
};

const useDndBlock = ({
  id,
  blockRef,
  removePreview
}) => {
  const editor = useEditorRef();
  const [dropLine, setDropLine] = useState('');
  const [{
    isDragging
  }, dragRef, preview] = useDragBlock(editor, id);
  const [{
    isOver
  }, drop] = useDropBlockOnEditor(editor, {
    id,
    blockRef,
    dropLine,
    setDropLine
  }); // TODO: previewElement option

  if (removePreview) {
    drop(blockRef);
    preview(getEmptyImage(), {
      captureDraggingState: true
    });
  } else {
    preview(drop(blockRef));
  }

  if (!isOver && dropLine) {
    setDropLine('');
  }

  return {
    isDragging,
    dropLine,
    dragRef
  };
};

const DefaultDragHandle = ({
  styles,
  ...props
}) => /*#__PURE__*/React.createElement(_StyledButton, _extends({
  type: "button"
}, props, {
  $_css: styles
}));

const Draggable = props => {
  var _styles$blockAndGutte, _styles$blockAndGutte2, _styles$block$css, _styles$block, _styles$dropLine, _styles$dropLine2, _styles$gutterLeft, _styles$blockAndGutte3, _styles$blockAndGutte4, _styles$gutterLeft$cs, _styles$gutterLeft2, _styles$blockToolbarW, _styles$blockToolbarW2, _styles$blockToolbar, _styles$blockToolbar2, _styles$dragHandle, _styles$dragHandle2;

  const {
    children,
    element,
    componentRef,
    onRenderDragHandle
  } = props;
  const DragHandle = onRenderDragHandle !== null && onRenderDragHandle !== void 0 ? onRenderDragHandle : DefaultDragHandle;
  const blockRef = useRef(null);
  const rootRef = useRef(null);
  const dragWrapperRef = useRef(null);
  const multiRootRef = useMergedRef(componentRef, rootRef);
  const {
    dropLine,
    dragRef,
    isDragging
  } = useDndBlock({
    id: element.id,
    blockRef: rootRef
  });
  const multiDragRef = useMergedRef(dragRef, dragWrapperRef);
  const styles = getDraggableStyles({ ...props,
    direction: dropLine,
    isDragging
  });
  return /*#__PURE__*/React.createElement(_StyledDiv, {
    className: styles.root.className,
    ref: multiRootRef,
    $_css2: styles.root.css
  }, /*#__PURE__*/React.createElement(_StyledDiv2, {
    ref: blockRef,
    $_css3: [...((_styles$blockAndGutte = (_styles$blockAndGutte2 = styles.blockAndGutter) === null || _styles$blockAndGutte2 === void 0 ? void 0 : _styles$blockAndGutte2.css) !== null && _styles$blockAndGutte !== void 0 ? _styles$blockAndGutte : []), ...((_styles$block$css = (_styles$block = styles.block) === null || _styles$block === void 0 ? void 0 : _styles$block.css) !== null && _styles$block$css !== void 0 ? _styles$block$css : [])]
  }, children, !!dropLine && /*#__PURE__*/React.createElement(_StyledDiv3, {
    className: (_styles$dropLine = styles.dropLine) === null || _styles$dropLine === void 0 ? void 0 : _styles$dropLine.className,
    contentEditable: false,
    $_css4: (_styles$dropLine2 = styles.dropLine) === null || _styles$dropLine2 === void 0 ? void 0 : _styles$dropLine2.css
  })), /*#__PURE__*/React.createElement(_StyledDiv4, {
    className: (_styles$gutterLeft = styles.gutterLeft) === null || _styles$gutterLeft === void 0 ? void 0 : _styles$gutterLeft.className,
    contentEditable: false,
    $_css5: [...((_styles$blockAndGutte3 = (_styles$blockAndGutte4 = styles.blockAndGutter) === null || _styles$blockAndGutte4 === void 0 ? void 0 : _styles$blockAndGutte4.css) !== null && _styles$blockAndGutte3 !== void 0 ? _styles$blockAndGutte3 : []), ...((_styles$gutterLeft$cs = (_styles$gutterLeft2 = styles.gutterLeft) === null || _styles$gutterLeft2 === void 0 ? void 0 : _styles$gutterLeft2.css) !== null && _styles$gutterLeft$cs !== void 0 ? _styles$gutterLeft$cs : [])]
  }, /*#__PURE__*/React.createElement(_StyledDiv5, {
    className: (_styles$blockToolbarW = styles.blockToolbarWrapper) === null || _styles$blockToolbarW === void 0 ? void 0 : _styles$blockToolbarW.className,
    $_css6: (_styles$blockToolbarW2 = styles.blockToolbarWrapper) === null || _styles$blockToolbarW2 === void 0 ? void 0 : _styles$blockToolbarW2.css
  }, /*#__PURE__*/React.createElement(_StyledDiv6, {
    className: (_styles$blockToolbar = styles.blockToolbar) === null || _styles$blockToolbar === void 0 ? void 0 : _styles$blockToolbar.className,
    ref: multiDragRef,
    $_css7: (_styles$blockToolbar2 = styles.blockToolbar) === null || _styles$blockToolbar2 === void 0 ? void 0 : _styles$blockToolbar2.css
  }, /*#__PURE__*/React.createElement(DragHandle, {
    element: element,
    styles: (_styles$dragHandle = styles.dragHandle) === null || _styles$dragHandle === void 0 ? void 0 : _styles$dragHandle.css,
    className: (_styles$dragHandle2 = styles.dragHandle) === null || _styles$dragHandle2 === void 0 ? void 0 : _styles$dragHandle2.className,
    onMouseDown: e => e.stopPropagation()
  })))));
};

var _StyledButton = _styled("button").withConfig({
  displayName: "Draggable___StyledButton",
  componentId: "sc-1c1pto8-0"
})(["", ""], p => p.$_css);

var _StyledDiv = _styled("div").withConfig({
  displayName: "Draggable___StyledDiv",
  componentId: "sc-1c1pto8-1"
})(["", ""], p => p.$_css2);

var _StyledDiv2 = _styled("div").withConfig({
  displayName: "Draggable___StyledDiv2",
  componentId: "sc-1c1pto8-2"
})(["", ""], p => p.$_css3);

var _StyledDiv3 = _styled("div").withConfig({
  displayName: "Draggable___StyledDiv3",
  componentId: "sc-1c1pto8-3"
})(["", ""], p => p.$_css4);

var _StyledDiv4 = _styled("div").withConfig({
  displayName: "Draggable___StyledDiv4",
  componentId: "sc-1c1pto8-4"
})(["", ""], p => p.$_css5);

var _StyledDiv5 = _styled("div").withConfig({
  displayName: "Draggable___StyledDiv5",
  componentId: "sc-1c1pto8-5"
})(["", ""], p => p.$_css6);

var _StyledDiv6 = _styled("div").withConfig({
  displayName: "Draggable___StyledDiv6",
  componentId: "sc-1c1pto8-6"
})(["", ""], p => p.$_css7);

const GrabberTooltipContent = () => /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12
  }
}, /*#__PURE__*/React.createElement("div", null, "Drag ", /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'rgba(255, 255, 255, 0.45)'
  }
}, "to move")));

const grabberTooltipProps = {
  content: /*#__PURE__*/React.createElement(GrabberTooltipContent, null),
  placement: 'bottom',
  arrow: false,
  offset: [0, 0],
  delay: [300, 0],
  duration: [0, 0],
  hideOnClick: true,
  theme: 'small'
};

const withDraggable = (Component, {
  styles,
  level,
  filter,
  allowReadOnly = false,
  onRenderDragHandle
} = {}) => {
  return /*#__PURE__*/forwardRef((props, ref) => {
    const {
      attributes,
      element
    } = props;
    const editor = useEditorRef();
    const readOnly = useReadOnly();
    const path = useMemo(() => ReactEditor.findPath(editor, element), [editor, element]);
    const filteredOut = useMemo(() => Number.isInteger(level) && level !== path.length - 1 || filter && filter(editor, path), [path, editor]);

    if (filteredOut || !allowReadOnly && readOnly) {
      return /*#__PURE__*/React.createElement(Component, props);
    }

    return /*#__PURE__*/React.createElement(Draggable, {
      attributes: attributes,
      element: element,
      componentRef: ref,
      styles: styles,
      onRenderDragHandle: onRenderDragHandle
    }, /*#__PURE__*/React.createElement(Component, props));
  });
};
const withDraggables = createNodesWithHOC(withDraggable);

/**
 * Select the start of a block by id and focus the editor.
 */

const focusBlockStartById = (editor, id) => {
  var _findNode;

  const path = (_findNode = findNode(editor, {
    at: [],
    match: {
      id
    }
  })) === null || _findNode === void 0 ? void 0 : _findNode[1];
  if (!path) return;
  Transforms.select(editor, Editor.start(editor, path));
  ReactEditor.focus(editor);
};

/**
 * Get blocks with an id
 */

const getBlocksWithId = (editor, options) => {
  return [...getNodes(editor, {
    match: n => Editor.isBlock(editor, n) && !!n.id,
    ...options
  })];
};

/**
 * Get node entries range.
 */

const getNodesRange = (editor, nodeEntries) => {
  if (!nodeEntries.length) return;
  const firstBlockPath = nodeEntries[0][1];
  const lastBlockPath = nodeEntries[nodeEntries.length - 1][1];
  return Editor.range(editor, firstBlockPath, lastBlockPath);
};

/**
 * Remove blocks with an id and focus the editor.
 */

const removeBlocksAndFocus = (editor, options) => {
  unhangRange(editor, options);
  const nodeEntries = getBlocksWithId(editor, options);
  Transforms.removeNodes(editor, {
    at: getNodesRange(editor, nodeEntries)
  });
  ReactEditor.focus(editor);
};

/**
 * Select the block above the selection by id and focus the editor.
 */

const selectBlockById = (editor, id) => {
  var _findNode;

  const path = (_findNode = findNode(editor, {
    at: [],
    match: {
      id
    }
  })) === null || _findNode === void 0 ? void 0 : _findNode[1];
  if (!path) return;
  Transforms.select(editor, Editor.range(editor, path));
  ReactEditor.focus(editor);
};

/**
 * Select blocks by selection or by id.
 * If the block with id is not selected, select the block with id.
 * Else, select the blocks above the selection.
 */

const selectBlocksBySelectionOrId = (editor, id) => {
  if (!editor.selection) return;
  const blockEntries = getBlocksWithId(editor, {
    at: editor.selection
  });
  const isBlockSelected = blockEntries.some(blockEntry => blockEntry[0].id === id);

  if (isBlockSelected) {
    Transforms.select(editor, getNodesRange(editor, blockEntries));
    ReactEditor.focus(editor);
  } else {
    selectBlockById(editor, id);
  }
};

export { Draggable, createDndPlugin, focusBlockStartById, getBlocksWithId, getDraggableStyles, getHoverDirection, getNewDirection, getNodesRange, grabberTooltipProps, removeBlocksAndFocus, selectBlockById, selectBlocksBySelectionOrId, useDndBlock, useDragBlock, useDropBlockOnEditor, withDraggable, withDraggables };
//# sourceMappingURL=index.es.js.map
