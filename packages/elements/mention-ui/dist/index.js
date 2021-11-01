'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var plateCombobox = require('@udecode/plate-combobox');
var plateMention = require('@udecode/plate-mention');
var plateStyledComponents = require('@udecode/plate-styled-components');
var _styled = require('styled-components');
var plateCommon = require('@udecode/plate-common');
var slateReact = require('slate-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);

const MentionCombobox = ({
  items,
  component,
  onRenderItem,
  pluginKey = plateMention.ELEMENT_MENTION,
  id = pluginKey,
  trigger = plateMention.COMBOBOX_TRIGGER_MENTION,
  insertSpaceAfterMention,
  createMentionNode
}) => /*#__PURE__*/React__default['default'].createElement(plateCombobox.Combobox, {
  id: id,
  trigger: trigger,
  controlled: true,
  items: items,
  component: component,
  onRenderItem: onRenderItem,
  onSelectItem: plateMention.getMentionOnSelectItem({
    pluginKey: id,
    insertSpaceAfterMention,
    createMentionNode
  })
});

const getMentionElementStyles = props => plateStyledComponents.createStyles({
  prefixClassNames: 'MentionElement',
  ...props
}, {
  root: [{
    "marginTop": "0px",
    "marginBottom": "0px",
    "marginLeft": "1px",
    "marginRight": "1px",
    "verticalAlign": "baseline",
    "display": "inline-block"
  }, props.selected && props.focused && {
    "boxShadow": "0 0 0 2px #B4D5FF"
  }, _styled.css(["padding:3px 3px 2px;border-radius:4px;background-color:#eee;font-size:0.9em;"])]
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

const MentionElement = props => {
  const {
    attributes,
    children,
    nodeProps,
    styles: _styles,
    element,
    classNames,
    prefixClassNames,
    prefix,
    as,
    onClick,
    renderLabel,
    ...rootProps
  } = props;
  const selected = slateReact.useSelected();
  const focused = slateReact.useFocused();
  const styles = getMentionElementStyles({ ...props,
    selected,
    focused
  });
  return /*#__PURE__*/React__default['default'].createElement(_StyledSpan$1, _extends({}, attributes, {
    as: as,
    "data-slate-value": element.value,
    className: styles.root.className,
    contentEditable: false,
    onClick: plateCommon.getHandler(onClick, element)
  }, rootProps, nodeProps, {
    $_css: styles.root.css
  }), prefix, renderLabel ? renderLabel(element) : element.value, children);
};

var _StyledSpan$1 = _styled__default['default']("span").withConfig({
  displayName: "MentionElement___StyledSpan",
  componentId: "sc-iu2gv3-0"
})(["", ""], p => p.$_css);

const getMentionInputElementStyles = props => plateStyledComponents.createStyles({
  prefixClassNames: 'MentionInputElement',
  ...props
}, {
  root: [{
    "marginTop": "0px",
    "marginBottom": "0px",
    "marginLeft": "1px",
    "marginRight": "1px",
    "verticalAlign": "baseline",
    "display": "inline-block"
  }, props.selected && props.focused && {
    "boxShadow": "0 0 0 2px #B4D5FF"
  }, _styled.css(["padding:3px 3px 2px;border-radius:4px;background-color:#eee;font-size:0.9em;"])]
});

const MentionInputElement = props => {
  const {
    attributes,
    children,
    nodeProps,
    styles: _styles,
    element,
    classNames,
    prefixClassNames,
    prefix,
    as,
    onClick,
    renderLabel,
    ...rootProps
  } = props;
  const selected = slateReact.useSelected();
  const focused = slateReact.useFocused();
  const styles = getMentionInputElementStyles({ ...props,
    selected,
    focused
  });
  return /*#__PURE__*/React__namespace.createElement(_StyledSpan, _extends({}, attributes, {
    as: as,
    "data-slate-value": element.value,
    className: styles.root.className,
    onClick: plateCommon.getHandler(onClick, element)
  }, rootProps, nodeProps, {
    $_css: styles.root.css
  }), children);
};

var _StyledSpan = _styled__default['default']("span").withConfig({
  displayName: "MentionInputElement___StyledSpan",
  componentId: "sc-1xv1w6t-0"
})(["", ""], p => p.$_css);

exports.MentionCombobox = MentionCombobox;
exports.MentionElement = MentionElement;
exports.MentionInputElement = MentionInputElement;
exports.getMentionElementStyles = getMentionElementStyles;
exports.getMentionInputElementStyles = getMentionInputElementStyles;
//# sourceMappingURL=index.js.map
