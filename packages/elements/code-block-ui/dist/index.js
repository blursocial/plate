'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateStyledComponents = require('@udecode/plate-styled-components');
var _styled = require('styled-components');
var React = require('react');
var plateCodeBlock = require('@udecode/plate-code-block');
var plateCommon = require('@udecode/plate-common');
var plateCore = require('@udecode/plate-core');
var slateReact = require('slate-react');
var plateToolbar = require('@udecode/plate-toolbar');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const getCodeBlockElementStyles = props => plateStyledComponents.createStyles({
  prefixClassNames: 'CodeBlockElement',
  ...props
}, {
  root: [{
    "whiteSpace": "pre-wrap",
    "paddingTop": "0.75rem",
    "paddingBottom": "0.75rem",
    "paddingLeft": "1rem",
    "paddingRight": "1rem"
  }, _styled.css(["font-size:16px;font-family:SFMono-Regular,Consolas,Monaco,'Liberation Mono',Menlo,Courier,monospace;tab-size:2;line-height:normal;border-radius:3px;background-color:rgb(247,246,243);"])]
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
  const [value, setValue] = React__default['default'].useState(lang);
  const editor = plateCore.useEditorRef();
  const code_block = plateCodeBlock.getCodeBlockPluginOptions(editor);
  return /*#__PURE__*/React__default['default'].createElement("select", _extends({
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
  }, props), /*#__PURE__*/React__default['default'].createElement("option", {
    value: ""
  }, "Plain text"), (code_block === null || code_block === void 0 ? void 0 : code_block.syntaxPopularFirst) && Object.entries(plateCodeBlock.CODE_BLOCK_LANGUAGES_POPULAR).map(([key, val]) => /*#__PURE__*/React__default['default'].createElement("option", {
    key: key,
    value: key
  }, val)), Object.entries(plateCodeBlock.CODE_BLOCK_LANGUAGES).map(([key, val]) => /*#__PURE__*/React__default['default'].createElement("option", {
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
  const editor = plateCore.useEditorRef();
  const {
    root
  } = getCodeBlockElementStyles(props);
  const code_block = plateCodeBlock.getCodeBlockPluginOptions(editor);
  const codeClassName = lang ? `${lang} language-${lang}` : '';
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(_StyledPre, _extends({}, attributes, {
    className: root.className
  }, rootProps, nodeProps, {
    $_css: root.css
  }), (code_block === null || code_block === void 0 ? void 0 : code_block.syntax) && /*#__PURE__*/React__default['default'].createElement(CodeBlockSelectElement, {
    "data-testid": "CodeBlockSelectElement",
    lang: lang,
    onChange: val => {
      const path = slateReact.ReactEditor.findPath(editor, element);
      plateCommon.setNodes(editor, {
        lang: val
      }, {
        at: path
      });
    }
  }), /*#__PURE__*/React__default['default'].createElement("code", {
    className: codeClassName
  }, children)));
};

var _StyledPre = _styled__default['default']("pre").withConfig({
  displayName: "CodeBlockElement___StyledPre",
  componentId: "sc-edret1-0"
})(["", ""], p => p.$_css);

const getCodeLineElementStyles = props => plateStyledComponents.createStyles({
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
  return /*#__PURE__*/React__default['default'].createElement(_StyledDiv, _extends({}, attributes, {
    className: root.className
  }, rootProps, nodeProps, {
    $_css: root.css
  }), children);
};

var _StyledDiv = _styled__default['default']("div").withConfig({
  displayName: "CodeLineElement___StyledDiv",
  componentId: "sc-11fh9za-0"
})(["", ""], p => p.$_css);

const ToolbarCodeBlock = ({
  options,
  ...props
}) => {
  const editor = plateCore.useStoreEditorState(plateCore.useEventEditorId('focus'));

  if (!editor) {
    return null;
  }

  return /*#__PURE__*/React__default['default'].createElement(plateToolbar.ToolbarElement, _extends({
    type: plateCodeBlock.getCodeBlockType(editor),
    onMouseDown: plateCommon.getPreventDefaultHandler(plateCodeBlock.insertEmptyCodeBlock, editor, {
      insertNodesOptions: {
        select: true
      },
      ...options
    })
  }, props));
};

exports.CodeBlockElement = CodeBlockElement;
exports.CodeBlockSelectElement = CodeBlockSelectElement;
exports.CodeLineElement = CodeLineElement;
exports.ToolbarCodeBlock = ToolbarCodeBlock;
exports.getCodeBlockElementStyles = getCodeBlockElementStyles;
exports.getCodeLineElementStyles = getCodeLineElementStyles;
//# sourceMappingURL=index.js.map
