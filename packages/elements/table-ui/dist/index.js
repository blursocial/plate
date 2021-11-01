'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jotai = require('jotai');
var plateStyledComponents = require('@udecode/plate-styled-components');
var _styled = require('styled-components');
var React = require('react');
var plateCore = require('@udecode/plate-core');
var plateTable = require('@udecode/plate-table');
var reResizable = require('re-resizable');
var slateReact = require('slate-react');
var plateCommon = require('@udecode/plate-common');
var plateUiButton = require('@udecode/plate-ui-button');
var plateUiPopover = require('@udecode/plate-ui-popover');
var plateToolbar = require('@udecode/plate-toolbar');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const hoveredColIndexAtom = jotai.atom(null);
const resizingColAtom = jotai.atom(null);

const getTableCellElementStyles = props => {
  const {
    hovered,
    hideBorder
  } = props;
  return plateStyledComponents.createStyles({
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
    }, _styled.css(["min-width:48px;"])],
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
    }, _styled.css(["top:-12px;right:-2px;width:4px;height:calc(100% + 12px);z-index:10;"])]
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
  const editor = plateCore.useEditorRef();
  const [hoveredColIndex, setHoveredColIndex] = jotai.useAtom(hoveredColIndexAtom, plateTable.ELEMENT_TABLE);
  const [, setResizingCol] = jotai.useAtom(resizingColAtom, plateTable.ELEMENT_TABLE);
  const colIndex = React.useMemo(() => plateTable.getTableColumnIndex(editor, {
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
    plateTable.setTableColSize(editor, {
      colIndex,
      width: ref.offsetWidth
    }, {
      at: slateReact.ReactEditor.findPath(editor, element)
    });
    setResizingCol(null);
  };

  return /*#__PURE__*/React__default['default'].createElement(_StyledTd, _extends({}, attributes, {
    className: root.className
  }, rootProps, nodeProps, {
    $_css: root.css
  }), /*#__PURE__*/React__default['default'].createElement(_StyledDiv, {
    className: content === null || content === void 0 ? void 0 : content.className,
    $_css2: content === null || content === void 0 ? void 0 : content.css
  }, children), /*#__PURE__*/React__default['default'].createElement(_StyledDiv2, {
    className: clsx(resizableWrapper === null || resizableWrapper === void 0 ? void 0 : resizableWrapper.className, 'group'),
    contentEditable: false,
    onMouseOver: () => setHoveredColIndex(colIndex),
    onFocus: () => setHoveredColIndex(colIndex),
    onMouseOut: () => setHoveredColIndex(null),
    onBlur: () => setHoveredColIndex(null),
    $_css3: resizableWrapper === null || resizableWrapper === void 0 ? void 0 : resizableWrapper.css
  }, /*#__PURE__*/React__default['default'].createElement(_StyledResizable, _extends({
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
  })), /*#__PURE__*/React__default['default'].createElement(_StyledDiv3, {
    className: handle === null || handle === void 0 ? void 0 : handle.className,
    $_css5: handle === null || handle === void 0 ? void 0 : handle.css
  })));
};

var _StyledTd = _styled__default['default']("td").withConfig({
  displayName: "TableCellElement___StyledTd",
  componentId: "sc-1b15v56-0"
})(["", ""], p => p.$_css);

var _StyledDiv = _styled__default['default']("div").withConfig({
  displayName: "TableCellElement___StyledDiv",
  componentId: "sc-1b15v56-1"
})(["", ""], p => p.$_css2);

var _StyledDiv2 = _styled__default['default']("div").withConfig({
  displayName: "TableCellElement___StyledDiv2",
  componentId: "sc-1b15v56-2"
})(["", ""], p => p.$_css3);

var _StyledResizable = _styled__default['default'](reResizable.Resizable).withConfig({
  displayName: "TableCellElement___StyledResizable",
  componentId: "sc-1b15v56-3"
})(["", ""], p => p.$_css4);

var _StyledDiv3 = _styled__default['default']("div").withConfig({
  displayName: "TableCellElement___StyledDiv3",
  componentId: "sc-1b15v56-4"
})(["", ""], p => p.$_css5);

const getTableElementStyles = props => plateStyledComponents.createStyles({
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
  const [resizingCol] = jotai.useAtom(resizingColAtom, plateTable.ELEMENT_TABLE);
  const colCount = plateTable.getTableColumnCount(tableNode);
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
}) => /*#__PURE__*/React__default['default'].createElement(plateUiPopover.Popover, _extends({
  content: /*#__PURE__*/React__default['default'].createElement(plateUiButton.RemoveNodeButton, {
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

  return /*#__PURE__*/React__default['default'].createElement(Popover, props, /*#__PURE__*/React__default['default'].createElement(_StyledTable, _extends({}, attributes, {
    className: root.className
  }, rootProps, nodeProps, {
    $_css: root.css
  }), /*#__PURE__*/React__default['default'].createElement("colgroup", null, colSizes.map((width, index) => /*#__PURE__*/React__default['default'].createElement("col", {
    key: index,
    style: width ? {
      width
    } : undefined
  }))), /*#__PURE__*/React__default['default'].createElement(_StyledTbody, {
    className: tbody === null || tbody === void 0 ? void 0 : tbody.className,
    $_css2: tbody === null || tbody === void 0 ? void 0 : tbody.css
  }, children)));
};
const TableElement = plateCommon.withProviders([jotai.Provider, {
  scope: plateTable.ELEMENT_TABLE
}])(TableElementBase);

var _StyledTable = _styled__default['default']("table").withConfig({
  displayName: "TableElement___StyledTable",
  componentId: "sc-1g9mdxx-0"
})(["", ""], p => p.$_css);

var _StyledTbody = _styled__default['default']("tbody").withConfig({
  displayName: "TableElement___StyledTbody",
  componentId: "sc-1g9mdxx-1"
})(["", ""], p => p.$_css2);

const getTableRowElementStyles = props => plateStyledComponents.createStyles({
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
  return /*#__PURE__*/React__default['default'].createElement(_StyledTr, _extends({}, attributes, {
    className: root.className
  }, rootProps, nodeProps, {
    $_css: root.css
  }), children);
};

var _StyledTr = _styled__default['default']("tr").withConfig({
  displayName: "TableRowElement___StyledTr",
  componentId: "sc-1c0uf2e-0"
})(["", ""], p => p.$_css);

const ToolbarTable = ({
  transform,
  header,
  ...props
}) => {
  const editor = plateCore.useStoreEditorState(plateCore.useEventEditorId('focus'));
  const type = plateCore.getPlatePluginType(editor, plateTable.ELEMENT_TABLE);
  return /*#__PURE__*/React__default['default'].createElement(plateToolbar.ToolbarButton, _extends({
    active: !!(editor !== null && editor !== void 0 && editor.selection) && plateCommon.someNode(editor, {
      match: {
        type
      }
    }),
    onMouseDown: !!type && editor ? plateCommon.getPreventDefaultHandler(transform, editor, {
      header
    }) : undefined
  }, props));
};

exports.TableCellElement = TableCellElement;
exports.TableElement = TableElement;
exports.TableElementBase = TableElementBase;
exports.TablePopover = TablePopover;
exports.TableRowElement = TableRowElement;
exports.ToolbarTable = ToolbarTable;
exports.getTableCellElementStyles = getTableCellElementStyles;
exports.getTableElementStyles = getTableElementStyles;
exports.getTableRowElementStyles = getTableRowElementStyles;
exports.hoveredColIndexAtom = hoveredColIndexAtom;
exports.resizingColAtom = resizingColAtom;
exports.useTableColSizes = useTableColSizes;
//# sourceMappingURL=index.js.map
