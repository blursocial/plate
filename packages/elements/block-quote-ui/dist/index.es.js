import { createStyles } from '@udecode/plate-styled-components';
import _styled, { css } from 'styled-components';
import React from 'react';

const getBlockquoteElementStyles = props => createStyles({
  prefixClassNames: 'BlockquoteElement',
  ...props
}, {
  root: [{
    "marginTop": "0.5rem",
    "marginBottom": "0.5rem",
    "marginLeft": "0px",
    "marginRight": "0px"
  }, css(["border-left:2px solid #ddd;padding:10px 20px 10px 16px;color:#aaa;"])]
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

const BlockquoteElement = props => {
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
  } = getBlockquoteElementStyles(props);
  return /*#__PURE__*/React.createElement(_StyledBlockquote, _extends({}, attributes, {
    className: root.className
  }, rootProps, nodeProps, {
    $_css: root.css
  }), children);
};

var _StyledBlockquote = _styled("blockquote").withConfig({
  displayName: "BlockquoteElement___StyledBlockquote",
  componentId: "sc-ifel8n-0"
})(["", ""], p => p.$_css);

export { BlockquoteElement, getBlockquoteElementStyles };
//# sourceMappingURL=index.es.js.map
