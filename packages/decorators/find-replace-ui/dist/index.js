'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var plateToolbar = require('@udecode/plate-toolbar');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ToolbarSearchHighlight = ({
  icon: Icon,
  setSearch
}) => /*#__PURE__*/React__default['default'].createElement(plateToolbar.HeadingToolbar, {
  styles: {
    root: {
      height: '38px'
    }
  }
}, /*#__PURE__*/React__default['default'].createElement("div", {
  style: {
    position: 'relative',
    paddingBottom: '10px',
    marginBottom: '10px'
  }
}, /*#__PURE__*/React__default['default'].createElement(Icon, {
  size: 18,
  style: {
    position: 'absolute',
    top: '0.5em',
    left: '0.5em',
    color: '#ccc'
  }
}), /*#__PURE__*/React__default['default'].createElement("input", {
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

exports.ToolbarSearchHighlight = ToolbarSearchHighlight;
//# sourceMappingURL=index.js.map
