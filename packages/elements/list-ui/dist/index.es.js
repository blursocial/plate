import { createStyles } from '@udecode/plate-styled-components';
import _styled from 'styled-components';
import React from 'react';
import { setNodes, getPreventDefaultHandler } from '@udecode/plate-common';
import { useEditorRef, useStoreEditorState, useEventEditorId } from '@udecode/plate-core';
import { useReadOnly, ReactEditor } from 'slate-react';
import { ELEMENT_UL, getListItemEntry, toggleList } from '@udecode/plate-list';
import { ToolbarElement } from '@udecode/plate-toolbar';

const getTodoListElementStyles = props => {
  return createStyles({
    prefixClassNames: 'TodoListElement',
    ...props
  }, {
    root: {
      "display": "flex",
      "flexDirection": "row",
      "paddingTop": "0.25rem",
      "paddingBottom": "0.25rem"
    },
    ...(props.checked && {
      rootChecked: {}
    }),
    checkboxWrapper: {
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "center",
      "userSelect": "none",
      "marginRight": "0.375rem"
    },
    checkbox: {
      "width": "1rem",
      "height": "1rem",
      "margin": "0px"
    },
    text: [{
      "flex": "1 1 0%",
      ":focus": {
        "outline": "2px solid transparent",
        "outlineOffset": "2px"
      }
    }, props.checked && {
      "textDecoration": "line-through",
      "opacity": "0.666"
    }]
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

const TodoListElement = props => {
  var _styles$rootChecked, _styles$checkboxWrapp, _styles$checkboxWrapp2, _styles$checkbox, _styles$checkbox2, _styles$text, _styles$text2;

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
  const editor = useEditorRef();
  const readOnly = useReadOnly();
  const {
    checked
  } = element;
  const styles = getTodoListElementStyles({ ...props,
    checked
  });
  return /*#__PURE__*/React.createElement(_StyledDiv, _extends({}, attributes, rootProps, {
    className: clsx(styles.root.className, (_styles$rootChecked = styles.rootChecked) === null || _styles$rootChecked === void 0 ? void 0 : _styles$rootChecked.className, rootProps === null || rootProps === void 0 ? void 0 : rootProps.className),
    $_css: styles.root.css
  }), /*#__PURE__*/React.createElement(_StyledDiv2, {
    contentEditable: false,
    className: (_styles$checkboxWrapp = styles.checkboxWrapper) === null || _styles$checkboxWrapp === void 0 ? void 0 : _styles$checkboxWrapp.className,
    $_css2: (_styles$checkboxWrapp2 = styles.checkboxWrapper) === null || _styles$checkboxWrapp2 === void 0 ? void 0 : _styles$checkboxWrapp2.css
  }, /*#__PURE__*/React.createElement(_StyledInput, _extends({
    "data-testid": "TodoListElementCheckbox",
    className: (_styles$checkbox = styles.checkbox) === null || _styles$checkbox === void 0 ? void 0 : _styles$checkbox.className,
    type: "checkbox",
    checked: !!checked,
    onChange: e => {
      const path = ReactEditor.findPath(editor, element);
      setNodes(editor, {
        checked: e.target.checked
      }, {
        at: path
      });
    }
  }, nodeProps, {
    $_css3: (_styles$checkbox2 = styles.checkbox) === null || _styles$checkbox2 === void 0 ? void 0 : _styles$checkbox2.css
  }))), /*#__PURE__*/React.createElement(_StyledSpan, {
    className: (_styles$text = styles.text) === null || _styles$text === void 0 ? void 0 : _styles$text.className,
    contentEditable: !readOnly,
    suppressContentEditableWarning: true,
    $_css4: (_styles$text2 = styles.text) === null || _styles$text2 === void 0 ? void 0 : _styles$text2.css
  }, children));
};

var _StyledDiv = _styled("div").withConfig({
  displayName: "TodoListElement___StyledDiv",
  componentId: "sc-1o2qsxo-0"
})(["", ""], p => p.$_css);

var _StyledDiv2 = _styled("div").withConfig({
  displayName: "TodoListElement___StyledDiv2",
  componentId: "sc-1o2qsxo-1"
})(["", ""], p => p.$_css2);

var _StyledInput = _styled("input").withConfig({
  displayName: "TodoListElement___StyledInput",
  componentId: "sc-1o2qsxo-2"
})(["", ""], p => p.$_css3);

var _StyledSpan = _styled("span").withConfig({
  displayName: "TodoListElement___StyledSpan",
  componentId: "sc-1o2qsxo-3"
})(["", ""], p => p.$_css4);

const ToolbarList = ({
  type = ELEMENT_UL,
  ...props
}) => {
  const editor = useStoreEditorState(useEventEditorId('focus'));
  const res = !!(editor !== null && editor !== void 0 && editor.selection) && getListItemEntry(editor);
  return /*#__PURE__*/React.createElement(ToolbarElement, _extends({
    active: !!res && res.list[0].type === type,
    type: type,
    onMouseDown: editor && getPreventDefaultHandler(toggleList, editor, {
      type
    })
  }, props));
};

export { TodoListElement, ToolbarList, getTodoListElementStyles };
//# sourceMappingURL=index.es.js.map
