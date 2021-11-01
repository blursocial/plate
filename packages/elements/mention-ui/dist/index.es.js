import * as React from 'react';
import React__default from 'react';
import { Combobox } from '@udecode/plate-combobox';
import { ELEMENT_MENTION, COMBOBOX_TRIGGER_MENTION, getMentionOnSelectItem } from '@udecode/plate-mention';
import { createStyles } from '@udecode/plate-styled-components';
import _styled, { css } from 'styled-components';
import { getHandler } from '@udecode/plate-common';
import { useSelected, useFocused } from 'slate-react';

const MentionCombobox = ({
  items,
  component,
  onRenderItem,
  pluginKey = ELEMENT_MENTION,
  id = pluginKey,
  trigger = COMBOBOX_TRIGGER_MENTION,
  insertSpaceAfterMention,
  createMentionNode
}) => /*#__PURE__*/React__default.createElement(Combobox, {
  id: id,
  trigger: trigger,
  controlled: true,
  items: items,
  component: component,
  onRenderItem: onRenderItem,
  onSelectItem: getMentionOnSelectItem({
    pluginKey: id,
    insertSpaceAfterMention,
    createMentionNode
  })
});

const getMentionElementStyles = props => createStyles({
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
  }, css(["padding:3px 3px 2px;border-radius:4px;background-color:#eee;font-size:0.9em;"])]
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
  const selected = useSelected();
  const focused = useFocused();
  const styles = getMentionElementStyles({ ...props,
    selected,
    focused
  });
  return /*#__PURE__*/React__default.createElement(_StyledSpan$1, _extends({}, attributes, {
    as: as,
    "data-slate-value": element.value,
    className: styles.root.className,
    contentEditable: false,
    onClick: getHandler(onClick, element)
  }, rootProps, nodeProps, {
    $_css: styles.root.css
  }), prefix, renderLabel ? renderLabel(element) : element.value, children);
};

var _StyledSpan$1 = _styled("span").withConfig({
  displayName: "MentionElement___StyledSpan",
  componentId: "sc-iu2gv3-0"
})(["", ""], p => p.$_css);

const getMentionInputElementStyles = props => createStyles({
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
  }, css(["padding:3px 3px 2px;border-radius:4px;background-color:#eee;font-size:0.9em;"])]
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
  const selected = useSelected();
  const focused = useFocused();
  const styles = getMentionInputElementStyles({ ...props,
    selected,
    focused
  });
  return /*#__PURE__*/React.createElement(_StyledSpan, _extends({}, attributes, {
    as: as,
    "data-slate-value": element.value,
    className: styles.root.className,
    onClick: getHandler(onClick, element)
  }, rootProps, nodeProps, {
    $_css: styles.root.css
  }), children);
};

var _StyledSpan = _styled("span").withConfig({
  displayName: "MentionInputElement___StyledSpan",
  componentId: "sc-1xv1w6t-0"
})(["", ""], p => p.$_css);

export { MentionCombobox, MentionElement, MentionInputElement, getMentionElementStyles, getMentionInputElementStyles };
//# sourceMappingURL=index.es.js.map
