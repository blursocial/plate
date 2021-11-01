import { createStyles } from '@udecode/plate-styled-components';
import _styled, { css } from 'styled-components';
import React from 'react';
import { someNode } from '@udecode/plate-common';
import { useStoreEditorState, useEventEditorId, getPlatePluginType } from '@udecode/plate-core';
import { ELEMENT_LINK, getAndUpsertLink } from '@udecode/plate-link';
import { ToolbarButton } from '@udecode/plate-toolbar';

const getLinkElementStyles = props => createStyles({
  prefixClassNames: 'LinkElement',
  ...props
}, {
  root: css(["color:#0078d4;text-decoration:initial;:hover,:visited:hover{color:#004578;text-decoration:underline;}:visited{color:#0078d4;}"])
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

const LinkElement = props => {
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
  const {
    root
  } = getLinkElementStyles(props);
  return /*#__PURE__*/React.createElement(_StyledA, _extends({}, attributes, {
    href: element.url,
    className: root.className
  }, rootProps, nodeProps, {
    $_css: root.css
  }), children);
};

var _StyledA = _styled("a").withConfig({
  displayName: "LinkElement___StyledA",
  componentId: "sc-1rpm6sw-0"
})(["", ""], p => p.$_css);

const ToolbarLink = ({
  getLinkUrl,
  ...props
}) => {
  const editor = useStoreEditorState(useEventEditorId('focus'));
  const type = getPlatePluginType(editor, ELEMENT_LINK);
  const isLink = !!(editor !== null && editor !== void 0 && editor.selection) && someNode(editor, {
    match: {
      type
    }
  });
  return /*#__PURE__*/React.createElement(ToolbarButton, _extends({
    active: isLink,
    onMouseDown: async event => {
      if (!editor) return;
      event.preventDefault();
      getAndUpsertLink(editor, getLinkUrl);
    }
  }, props));
};

export { LinkElement, ToolbarLink, getLinkElementStyles };
//# sourceMappingURL=index.es.js.map
