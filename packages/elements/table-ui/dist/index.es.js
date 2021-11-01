import { atom, useAtom, Provider } from 'jotai';
import { createStyles } from '@udecode/plate-styled-components';
import _styled, { css } from 'styled-components';
import React, { useMemo } from 'react';
import { useEditorRef, useStoreEditorState, useEventEditorId, getPlatePluginType } from '@udecode/plate-core';
import { ELEMENT_TABLE, getTableColumnIndex, setTableColSize, getTableColumnCount } from '@udecode/plate-table';
import { Resizable } from 're-resizable';
import { ReactEditor } from 'slate-react';
import { withProviders, someNode, getPreventDefaultHandler } from '@udecode/plate-common';
import { RemoveNodeButton } from '@udecode/plate-ui-button';
import { Popover } from '@udecode/plate-ui-popover';
import { ToolbarButton } from '@udecode/plate-toolbar';

const hoveredColIndexAtom = atom(null);
const resizingColAtom = atom(null);

const getTableCellElementStyles = props => {
  const {
    hovered,
    hideBorder
  } = props;
  return createStyles({
    prefixClassNames: 'TableCellElement',
    ...props
  }, {
    root: [{
      "position": "relative",
      "padding": "0px",
      "overflow": "visible",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))"
    }, hideBorder ? {
      "borderStyle": "none"
    } : {
      "borderWidth": "1px",
      "--tw-border-opacity": "1",
      "borderColor": "rgba(209, 213, 219, var(--tw-border-opacity))"
    }, css(["min-width:48px;"])],
    content: {
      "position": "relative",
      "paddingLeft": "0.75rem",
      "paddingRight": "0.75rem",
      "paddingTop": "0.5rem",
      "paddingBottom": "0.5rem",
      "zIndex": "10"
    },
    resizableWrapper: [{
      "position": "absolute",
      "width": "100%",
      "height": "100%",
      "top": "0px"
    }],
    handle: [{
      "position": "absolute"
    }, hovered && {
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(59, 130, 246, var(--tw-bg-opacity))"
    }, css(["top:-12px;right:-2px;width:4px;height:calc(100% + 12px);z-index:10;"])]
  });
};

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

function toVal(mix) {
	var k, y, str='';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			for (k=0; k < mix.length; k++) {
				if (mix[k]) {
					if (y = toVal(mix[k])) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (k in mix) {
				if (mix[k]) {
					str && (str += ' ');
					str += k;
				}
			}
		}
	}

	return str;
}

function clsx () {
	var i=0, tmp, x, str='';
	while (i < arguments.length) {
		if (tmp = arguments[i++]) {
			if (x = toVal(tmp)) {
				str && (str += ' ');
				str += x;
			}
		}
	}
	return str;
}

const TableCellElement = props => {
  const {
    attributes,
    children,
    nodeProps,
    styles,
    element,
    classNames,
    prefixClassNames,
    resizableProps,
    ...rootProps
  } = props;
  const editor = useEditorRef();
  const [hoveredColIndex, setHoveredColIndex] = useAtom(hoveredColIndexAtom, ELEMENT_TABLE);
  const [, setResizingCol] = useAtom(resizingColAtom, ELEMENT_TABLE);
  const colIndex = useMemo(() => getTableColumnIndex(editor, {
    node: element
  }), [editor, element]);
  const {
    root,
    content,
    resizableWrapper,
    resizable,
    handle
  } = getTableCellElementStyles({ ...props,
    hovered: hoveredColIndex === colIndex
  });

  const onResize = (e, direction, ref) => {
    setResizingCol({
      index: colIndex,
      width: ref.offsetWidth
    });
  };

  const onResizeStop = (e, direction, ref) => {
    setTableColSize(editor, {
      colIndex,
      width: ref.offsetWidth
    }, {
      at: ReactEditor.findPath(editor, element)
    });
    setResizingCol(null);
  };

  return /*#__PURE__*/React.createElement(_StyledTd, _extends({}, attributes, {
    className: root.className
  }, rootProps, nodeProps, {
    $_css: root.css
  }), /*#__PURE__*/React.createElement(_StyledDiv, {
    className: content === null || content === void 0 ? void 0 : content.className,
    $_css2: content === null || content === void 0 ? void 0 : content.css
  }, children), /*#__PURE__*/React.createElement(_StyledDiv2, {
    className: clsx(resizableWrapper === null || resizableWrapper === void 0 ? void 0 : resizableWrapper.className, 'group'),
    contentEditable: false,
    onMouseOver: () => setHoveredColIndex(colIndex),
    onFocus: () => setHoveredColIndex(colIndex),
    onMouseOut: () => setHoveredColIndex(null),
    onBlur: () => setHoveredColIndex(null),
    $_css3: resizableWrapper === null || resizableWrapper === void 0 ? void 0 : resizableWrapper.css
  }, /*#__PURE__*/React.createElement(_StyledResizable, _extends({
    className: resizable === null || resizable === void 0 ? void 0 : resizable.className,
    size: {
      width: '100%',
      height: '100%'
    },
    enable: {
      right: true
    },
    handleStyles: {
      right: {
        top: -12,
        height: 'calc(100% + 12px)',
        zIndex: 20
      }
    },
    onResize: onResize,
    onResizeStop: onResizeStop
  }, resizableProps, {
    $_css4: resizable === null || resizable === void 0 ? void 0 : resizable.css
  })), /*#__PURE__*/React.createElement(_StyledDiv3, {
    className: handle === null || handle === void 0 ? void 0 : handle.className,
    $_css5: handle === null || handle === void 0 ? void 0 : handle.css
  })));
};

var _StyledTd = _styled("td").withConfig({
  displayName: "TableCellElement___StyledTd",
  componentId: "sc-1b15v56-0"
})(["", ""], p => p.$_css);

var _StyledDiv = _styled("div").withConfig({
  displayName: "TableCellElement___StyledDiv",
  componentId: "sc-1b15v56-1"
})(["", ""], p => p.$_css2);

var _StyledDiv2 = _styled("div").withConfig({
  displayName: "TableCellElement___StyledDiv2",
  componentId: "sc-1b15v56-2"
})(["", ""], p => p.$_css3);

var _StyledResizable = _styled(Resizable).withConfig({
  displayName: "TableCellElement___StyledResizable",
  componentId: "sc-1b15v56-3"
})(["", ""], p => p.$_css4);

var _StyledDiv3 = _styled("div").withConfig({
  displayName: "TableCellElement___StyledDiv3",
  componentId: "sc-1b15v56-4"
})(["", ""], p => p.$_css5);

const getTableElementStyles = props => createStyles({
  prefixClassNames: 'TableElement',
  ...props
}, {
  root: [{
    "display": "table",
    "width": "100%",
    "marginTop": "1rem",
    "marginBottom": "1rem",
    "marginLeft": "0px",
    "marginRight": "0px",
    "borderCollapse": "collapse"
  }],
  tbody: {
    "minWidth": "100%"
  }
});

const useTableColSizes = tableNode => {
  const [resizingCol] = useAtom(resizingColAtom, ELEMENT_TABLE);
  const colCount = getTableColumnCount(tableNode);
  const colSizes = tableNode.colSizes ? [...tableNode.colSizes] : Array(colCount);

  if (resizingCol) {
    var _resizingCol$index;

    colSizes[(_resizingCol$index = resizingCol.index) !== null && _resizingCol$index !== void 0 ? _resizingCol$index : 0] = resizingCol.width;
  }

  return colSizes;
};

const TablePopover = ({
  element,
  popoverProps,
  children
}) => /*#__PURE__*/React.createElement(Popover, _extends({
  content: /*#__PURE__*/React.createElement(RemoveNodeButton, {
    element: element
  })
}, popoverProps), children);

const TableElementBase = props => {
  const {
    attributes,
    children,
    nodeProps,
    styles,
    element,
    classNames,
    prefixClassNames,
    transformColSizes,
    onRenderContainer: Popover = TablePopover,
    ...rootProps
  } = props;
  const {
    root,
    tbody
  } = getTableElementStyles(props);
  let colSizes = useTableColSizes(element);

  if (transformColSizes) {
    colSizes = transformColSizes(colSizes);
  }

  return /*#__PURE__*/React.createElement(Popover, props, /*#__PURE__*/React.createElement(_StyledTable, _extends({}, attributes, {
    className: root.className
  }, rootProps, nodeProps, {
    $_css: root.css
  }), /*#__PURE__*/React.createElement("colgroup", null, colSizes.map((width, index) => /*#__PURE__*/React.createElement("col", {
    key: index,
    style: width ? {
      width
    } : undefined
  }))), /*#__PURE__*/React.createElement(_StyledTbody, {
    className: tbody === null || tbody === void 0 ? void 0 : tbody.className,
    $_css2: tbody === null || tbody === void 0 ? void 0 : tbody.css
  }, children)));
};
const TableElement = withProviders([Provider, {
  scope: ELEMENT_TABLE
}])(TableElementBase);

var _StyledTable = _styled("table").withConfig({
  displayName: "TableElement___StyledTable",
  componentId: "sc-1g9mdxx-0"
})(["", ""], p => p.$_css);

var _StyledTbody = _styled("tbody").withConfig({
  displayName: "TableElement___StyledTbody",
  componentId: "sc-1g9mdxx-1"
})(["", ""], p => p.$_css2);

const getTableRowElementStyles = props => createStyles({
  prefixClassNames: 'TableRowElement',
  ...props
}, {
  root: [props.hideBorder && {
    "borderStyle": "none"
  }]
});

const TableRowElement = props => {
  const {
    attributes,
    children,
    nodeProps,
    styles,
    element,
    classNames,
    prefixClassNames,
    // resizableProps,
    ...rootProps
  } = props;
  const {
    root
  } = getTableRowElementStyles(props);
  return /*#__PURE__*/React.createElement(_StyledTr, _extends({}, attributes, {
    className: root.className
  }, rootProps, nodeProps, {
    $_css: root.css
  }), children);
};

var _StyledTr = _styled("tr").withConfig({
  displayName: "TableRowElement___StyledTr",
  componentId: "sc-1c0uf2e-0"
})(["", ""], p => p.$_css);

const ToolbarTable = ({
  transform,
  header,
  ...props
}) => {
  const editor = useStoreEditorState(useEventEditorId('focus'));
  const type = getPlatePluginType(editor, ELEMENT_TABLE);
  return /*#__PURE__*/React.createElement(ToolbarButton, _extends({
    active: !!(editor !== null && editor !== void 0 && editor.selection) && someNode(editor, {
      match: {
        type
      }
    }),
    onMouseDown: !!type && editor ? getPreventDefaultHandler(transform, editor, {
      header
    }) : undefined
  }, props));
};

export { TableCellElement, TableElement, TableElementBase, TablePopover, TableRowElement, ToolbarTable, getTableCellElementStyles, getTableElementStyles, getTableRowElementStyles, hoveredColIndexAtom, resizingColAtom, useTableColSizes };
//# sourceMappingURL=index.es.js.map
