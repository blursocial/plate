import React from 'react';
import { HeadingToolbar } from '@udecode/plate-toolbar';

const ToolbarSearchHighlight = ({
  icon: Icon,
  setSearch
}) => /*#__PURE__*/React.createElement(HeadingToolbar, {
  styles: {
    root: {
      height: '38px'
    }
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative',
    paddingBottom: '10px',
    marginBottom: '10px'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  size: 18,
  style: {
    position: 'absolute',
    top: '0.5em',
    left: '0.5em',
    color: '#ccc'
  }
}), /*#__PURE__*/React.createElement("input", {
  "data-testid": "ToolbarSearchHighlightInput",
  type: "search",
  placeholder: "Search the text...",
  onChange: e => setSearch(e.target.value),
  style: {
    boxSizing: 'border-box',
    fontSize: '0.85em',
    width: '100%',
    padding: '0.5em',
    paddingLeft: '2em',
    border: '2px solid #ddd',
    background: '#fafafa'
  }
})));

export { ToolbarSearchHighlight };
//# sourceMappingURL=index.es.js.map
