import { createStyles } from '@udecode/plate-styled-components';
import _styled, { css } from 'styled-components';
import React from 'react';
import { getCodeBlockPluginOptions, CODE_BLOCK_LANGUAGES_POPULAR, CODE_BLOCK_LANGUAGES, getCodeBlockType, insertEmptyCodeBlock } from '@udecode/plate-code-block';
import { setNodes, getPreventDefaultHandler } from '@udecode/plate-common';
import { useEditorRef, useStoreEditorState, useEventEditorId } from '@udecode/plate-core';
import { ReactEditor } from 'slate-react';
import { ToolbarElement } from '@udecode/plate-toolbar';

const getCodeBlockElementStyles = props => createStyles({
  prefixClassNames: 'CodeBlockElement',
  ...props
}, {
  root: [{
    "whiteSpace": "pre-wrap",
    "paddingTop": "0.75rem",
    "paddingBottom": "0.75rem",
    "paddingLeft": "1rem",
    "paddingRight": "1rem"
  }, css(["font-size:16px;font-family:SFMono-Regular,Consolas,Monaco,'Liberation Mono',Menlo,Courier,monospace;tab-size:2;line-height:normal;border-radius:3px;background-color:rgb(247,246,243);"])]
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

const CodeBlockSelectElement = ({
  lang,
  onChange,
  ...props
}) => {
  const [value, setValue] = React.useState(lang);
  const editor = useEditorRef();
  const code_block = getCodeBlockPluginOptions(editor);
  return /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    style: {
      float: 'right'
    },
    onClick: e => {
      e.stopPropagation();
    },
    onChange: e => {
      onChange(e.target.value);
      setValue(e.target.value);
    },
    contentEditable: false
  }, props), /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Plain text"), (code_block === null || code_block === void 0 ? void 0 : code_block.syntaxPopularFirst) && Object.entries(CODE_BLOCK_LANGUAGES_POPULAR).map(([key, val]) => /*#__PURE__*/React.createElement("option", {
    key: key,
    value: key
  }, val)), Object.entries(CODE_BLOCK_LANGUAGES).map(([key, val]) => /*#__PURE__*/React.createElement("option", {
    key: key,
    value: key
  }, val)));
};

const CodeBlockElement = props => {
  const {
    attributes,
    children,
    nodeProps,
    styles,
    element,
    classNames,
    prefixClassNames,
    ...rootProps
  } = props;
  const {
    lang
  } = element;
  const editor = useEditorRef();
  const {
    root
  } = getCodeBlockElementStyles(props);
  const code_block = getCodeBlockPluginOptions(editor);
  const codeClassName = lang ? `${lang} language-${lang}` : '';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_StyledPre, _extends({}, attributes, {
    className: root.className
  }, rootProps, nodeProps, {
    $_css: root.css
  }), (code_block === null || code_block === void 0 ? void 0 : code_block.syntax) && /*#__PURE__*/React.createElement(CodeBlockSelectElement, {
    "data-testid": "CodeBlockSelectElement",
    lang: lang,
    onChange: val => {
      const path = ReactEditor.findPath(editor, element);
      setNodes(editor, {
        lang: val
      }, {
        at: path
      });
    }
  }), /*#__PURE__*/React.createElement("code", {
    className: codeClassName
  }, children)));
};

var _StyledPre = _styled("pre").withConfig({
  displayName: "CodeBlockElement___StyledPre",
  componentId: "sc-edret1-0"
})(["", ""], p => p.$_css);

const getCodeLineElementStyles = props => createStyles({
  prefixClassNames: 'CodeLineElement',
  ...props
}, {
  root: [{}]
});

const CodeLineElement = props => {
  const {
    attributes,
    children,
    nodeProps,
    styles,
    element,
    classNames,
    prefixClassNames,
    ...rootProps
  } = props;
  const {
    root
  } = getCodeLineElementStyles(props);
  return /*#__PURE__*/React.createElement(_StyledDiv, _extends({}, attributes, {
    className: root.className
  }, rootProps, nodeProps, {
    $_css: root.css
  }), children);
};

var _StyledDiv = _styled("div").withConfig({
  displayName: "CodeLineElement___StyledDiv",
  componentId: "sc-11fh9za-0"
})(["", ""], p => p.$_css);

const ToolbarCodeBlock = ({
  options,
  ...props
}) => {
  const editor = useStoreEditorState(useEventEditorId('focus'));

  if (!editor) {
    return null;
  }

  return /*#__PURE__*/React.createElement(ToolbarElement, _extends({
    type: getCodeBlockType(editor),
    onMouseDown: getPreventDefaultHandler(insertEmptyCodeBlock, editor, {
      insertNodesOptions: {
        select: true
      },
      ...options
    })
  }, props));
};

export { CodeBlockElement, CodeBlockSelectElement, CodeLineElement, ToolbarCodeBlock, getCodeBlockElementStyles, getCodeLineElementStyles };
//# sourceMappingURL=index.es.js.map
