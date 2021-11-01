'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _styled = require('styled-components');
var React = require('react');
var ReactDOM = require('react-dom');
var clsx = require('clsx');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
var clsx__default = /*#__PURE__*/_interopDefaultLegacy(clsx);

const Divider = props => /*#__PURE__*/React__default['default'].createElement(_StyledDiv$1, props);

var _StyledDiv$1 = _styled__default['default']("div").withConfig({
  displayName: "Divider___StyledDiv",
  componentId: "sc-n6iu2k-0"
})({
  "marginLeft": "0.5rem",
  "marginRight": "0.5rem",
  "marginTop": "0.125rem",
  "marginBottom": "0.125rem",
  "width": "1px",
  "--tw-bg-opacity": "1",
  "backgroundColor": "rgba(229, 231, 235, var(--tw-bg-opacity))"
});

const PortalBody = ({
  children,
  element
}) => /*#__PURE__*/ReactDOM__default['default'].createPortal(children, element || document.body);

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

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/**
 * Casts `value` as an array if it's not one.
 *
 * @static
 * @memberOf _
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * _.castArray(1);
 * // => [1]
 *
 * _.castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * _.castArray('abc');
 * // => ['abc']
 *
 * _.castArray(null);
 * // => [null]
 *
 * _.castArray(undefined);
 * // => [undefined]
 *
 * _.castArray();
 * // => []
 *
 * var array = [1, 2, 3];
 * console.log(_.castArray(array) === array);
 * // => true
 */
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray_1(value) ? value : [value];
}

var castArray_1 = castArray;

const createStyles = (props, styles) => {
  const stylesArray = castArray_1(styles);
  const allStyles = {};
  stylesArray.forEach(_styles => {
    Object.keys(_styles).forEach(key => {
      var _props$classNames, _props$styles;

      const cssProp = castArray_1(_styles[key]); // Init css and className props

      if (!allStyles[key]) {
        let className = '';

        if (props.prefixClassNames) {
          if (key === 'root') {
            className = `slate-${props.prefixClassNames}`;
          } else {
            className = `slate-${props.prefixClassNames}-${key}`;
          }
        }

        allStyles[key] = {
          css: cssProp,
          className: clsx__default['default'](props.prefixClassNames && className)
        };
      } // Extend className with `classNames` prop


      const classNameProp = props === null || props === void 0 ? void 0 : (_props$classNames = props.classNames) === null || _props$classNames === void 0 ? void 0 : _props$classNames[key];

      if (classNameProp) {
        allStyles[key].className = clsx__default['default'](allStyles[key].className, classNameProp);
      } // Extend css with `styles` prop


      const cssPropOverride = props === null || props === void 0 ? void 0 : (_props$styles = props.styles) === null || _props$styles === void 0 ? void 0 : _props$styles[key];
      if (!cssPropOverride) return;
      const cssPropOverrideArray = castArray_1(cssPropOverride);
      allStyles[key].css.push(...cssPropOverrideArray);
    });
  });
  return allStyles;
};

const getStyledNodeStyles = props => createStyles(props, {
  root: [{}]
});

/**
 * StyledElement with no default styles.
 */
const StyledElement = props => {
  var _styles$root, _nodeProps$styles$roo, _nodeProps$styles, _nodeProps$styles$roo2;

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
  const rootStyles = castArray_1((_styles$root = styles === null || styles === void 0 ? void 0 : styles.root) !== null && _styles$root !== void 0 ? _styles$root : []);
  const nodePropsStyles = (_nodeProps$styles$roo = nodeProps === null || nodeProps === void 0 ? void 0 : (_nodeProps$styles = nodeProps.styles) === null || _nodeProps$styles === void 0 ? void 0 : (_nodeProps$styles$roo2 = _nodeProps$styles.root) === null || _nodeProps$styles$roo2 === void 0 ? void 0 : _nodeProps$styles$roo2.css) !== null && _nodeProps$styles$roo !== void 0 ? _nodeProps$styles$roo : [];
  const {
    root
  } = getStyledNodeStyles({ ...nodeProps,
    styles: {
      root: [...rootStyles, ...nodePropsStyles]
    }
  });
  return /*#__PURE__*/React__default['default'].createElement(_StyledDiv, _extends({}, attributes, rootProps, nodeProps, {
    $_css: root.css
  }), children);
};

var _StyledDiv = _styled__default['default']("div").withConfig({
  displayName: "StyledElement___StyledDiv",
  componentId: "sc-2e063k-0"
})(["", ""], p => p.$_css);

/**
 * StyledLeaf with no default styles.
 */
const StyledLeaf = props => {
  var _styles$root, _nodeProps$styles$roo, _nodeProps$styles, _nodeProps$styles$roo2;

  const {
    attributes,
    children,
    nodeProps,
    styles,
    classNames,
    prefixClassNames,
    leaf,
    text,
    ...rootProps
  } = props;
  const rootStyles = castArray_1((_styles$root = styles === null || styles === void 0 ? void 0 : styles.root) !== null && _styles$root !== void 0 ? _styles$root : []);
  const nodePropsStyles = (_nodeProps$styles$roo = nodeProps === null || nodeProps === void 0 ? void 0 : (_nodeProps$styles = nodeProps.styles) === null || _nodeProps$styles === void 0 ? void 0 : (_nodeProps$styles$roo2 = _nodeProps$styles.root) === null || _nodeProps$styles$roo2 === void 0 ? void 0 : _nodeProps$styles$roo2.css) !== null && _nodeProps$styles$roo !== void 0 ? _nodeProps$styles$roo : [];
  const {
    root
  } = getStyledNodeStyles({ ...nodeProps,
    styles: {
      root: [...rootStyles, ...nodePropsStyles]
    }
  });
  return /*#__PURE__*/React__default['default'].createElement(_StyledSpan, _extends({}, attributes, rootProps, nodeProps, {
    $_css: root.css
  }), children);
};

var _StyledSpan = _styled__default['default']("span").withConfig({
  displayName: "StyledLeaf___StyledSpan",
  componentId: "sc-129cvv1-0"
})(["", ""], p => p.$_css);

/**
 * HOC mapping element/leaf props to component styles
 */
const withStyledProps = (Component, {
  elementProps = {},
  leafProps = {}
}) => _props => {
  const {
    element,
    leaf
  } = _props;
  const styles = {
    root: {}
  };
  Object.keys(elementProps).forEach(nodeProp => {
    const cssPropKeys = castArray_1(elementProps[nodeProp]);
    cssPropKeys.forEach(key => {
      styles.root[key] = element[nodeProp];
    });
  });
  Object.keys(leafProps).forEach(nodeProp => {
    const cssPropKeys = castArray_1(leafProps[nodeProp]);
    cssPropKeys.forEach(key => {
      styles.root[key] = leaf[nodeProp];
    });
  });
  return /*#__PURE__*/React__default['default'].createElement(Component, _extends({}, _props, {
    styles: styles
  }));
};

exports.Divider = Divider;
exports.PortalBody = PortalBody;
exports.StyledElement = StyledElement;
exports.StyledLeaf = StyledLeaf;
exports.createStyles = createStyles;
exports.getStyledNodeStyles = getStyledNodeStyles;
exports.withStyledProps = withStyledProps;
//# sourceMappingURL=index.js.map
