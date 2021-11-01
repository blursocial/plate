'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateStyledComponents = require('@udecode/plate-styled-components');
var _styled = require('styled-components');
var React = require('react');
var plateCommon = require('@udecode/plate-common');
var plateCore = require('@udecode/plate-core');
var platePopper = require('@udecode/plate-popper');
var Tippy = require('@tippyjs/react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Tippy__default = /*#__PURE__*/_interopDefaultLegacy(Tippy);

const getToolbarStyles = props => plateStyledComponents.createStyles({
  prefixClassNames: 'Toolbar',
  ...props
}, {
  root: [{
    "display": "flex",
    "alignItems": "center",
    "userSelect": "none",
    "boxSizing": "content-box"
  }, {
    "color": "rgb(68, 68, 68)",
    "minHeight": "40px"
  }]
});

const getBalloonToolbarStyles = props => {
  var _props$popperOptions;

  let color = 'rgb(157, 170, 182)';
  let colorActive = 'white';
  let background = 'rgb(36, 42, 49)';
  let borderColor = 'transparent';

  if (props.theme === 'light') {
    color = 'rgba(0, 0, 0, 0.50)';
    colorActive = 'black';
    background = 'rgb(250, 250, 250)';
    borderColor = 'rgb(196, 196, 196)';
  }

  const {
    placement = 'top'
  } = (_props$popperOptions = props.popperOptions) !== null && _props$popperOptions !== void 0 ? _props$popperOptions : {};
  const arrowStyle = [props.arrow && _styled.css(["::after{left:50%;content:' ';position:absolute;margin-top:-1px;transform:translateX(-50%);border-color:", " transparent;border-style:solid;}"], background), props.arrow && placement.includes('top') && _styled.css(["::after{top:100%;bottom:auto;border-width:8px 8px 0;}"]), props.arrow && !placement.includes('top') && _styled.css(["::after{top:auto;bottom:100%;border-width:0 8px 8px;}"])];
  const arrowBorderStyle = [props.arrow && placement.includes('top') && props.theme === 'light' && _styled.css(["::before{margin-top:0;border-width:9px 9px 0;border-color:", " transparent;}"], borderColor), props.arrow && !placement.includes('top') && props.theme === 'light' && _styled.css(["::before{margin-top:0;border-width:0 9px 9px;border-color:", " transparent;}"], borderColor)];
  return plateStyledComponents.createStyles({
    prefixClassNames: 'BalloonToolbar',
    ...props
  }, {
    root: [...getToolbarStyles(props).root.css, {
      "position": "absolute",
      "whiteSpace": "nowrap",
      "opacity": "1",
      "transition": "opacity .2s ease-in-out"
    }, _styled.css(["color:", ";background:", ";z-index:500;border:1px solid ", ";border-radius:4px;.slate-ToolbarButton-active,.slate-ToolbarButton:hover{color:", ";}::before{", "}"], color, background, borderColor, colorActive, arrowBorderStyle), ...arrowStyle, ...arrowBorderStyle]
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

const ToolbarBase = /*#__PURE__*/React__default['default'].forwardRef((props, ref) => {
  return /*#__PURE__*/React__default['default'].createElement("div", _extends({
    "data-testid": "Toolbar",
    ref: ref
  }, props));
});

var _StyledToolbarBase$2 = _styled__default['default'](ToolbarBase).withConfig({
  displayName: "Toolbar___StyledToolbarBase",
  componentId: "sc-1wna77d-0"
})(["", ""], p => p.$_css);

const Toolbar = /*#__PURE__*/React__default['default'].forwardRef((props, ref) => {
  const {
    root
  } = getToolbarStyles(props);
  return /*#__PURE__*/React__default['default'].createElement(_StyledToolbarBase$2, _extends({}, props, {
    ref: ref,
    className: root.className,
    $_css: root.css
  }));
});

const useBalloonToolbarPopper = options => {
  var _selectionText$length;

  const editor = plateCore.useStoreEditorState(plateCore.useEventEditorId('focus'));
  const [isHidden, setIsHidden] = React.useState(true);
  const selectionExpanded = editor && plateCommon.isSelectionExpanded(editor);
  const selectionText = editor && plateCommon.getSelectionText(editor);
  const show = React.useCallback(() => {
    if (isHidden && selectionExpanded) {
      setIsHidden(false);
    }
  }, [isHidden, selectionExpanded]);
  React.useEffect(() => {
    if (!selectionText) {
      setIsHidden(true);
    } else if (selectionText && selectionExpanded) {
      setIsHidden(false);
    }
  }, [selectionExpanded, selectionText, show]);
  const popperResult = platePopper.usePopperPosition({
    isHidden,
    getBoundingClientRect: platePopper.getSelectionBoundingClientRect,
    ...options
  });
  const selectionTextLength = (_selectionText$length = selectionText === null || selectionText === void 0 ? void 0 : selectionText.length) !== null && _selectionText$length !== void 0 ? _selectionText$length : 0;
  const {
    update
  } = popperResult;
  React.useEffect(() => {
    selectionTextLength > 0 && (update === null || update === void 0 ? void 0 : update());
  }, [selectionTextLength, update]);
  return popperResult;
};

const BalloonToolbar = props => {
  const {
    children,
    theme = 'dark',
    arrow = false,
    portalElement,
    popperOptions: _popperOptions = {}
  } = props;
  const popperRef = React.useRef(null);
  const popperOptions = {
    popperElement: popperRef.current,
    placement: 'top',
    offset: [0, 8],
    ..._popperOptions
  };
  const {
    styles: popperStyles,
    attributes
  } = useBalloonToolbarPopper(popperOptions);
  const styles = getBalloonToolbarStyles({
    popperOptions,
    theme,
    arrow,
    ...props
  });
  return /*#__PURE__*/React__default['default'].createElement(plateStyledComponents.PortalBody, {
    element: portalElement
  }, /*#__PURE__*/React__default['default'].createElement(_StyledToolbarBase$1, _extends({
    ref: popperRef,
    className: styles.root.className,
    style: popperStyles.popper
  }, attributes.popper, {
    $_css: styles.root.css
  }), children));
};

var _StyledToolbarBase$1 = _styled__default['default'](ToolbarBase).withConfig({
  displayName: "BalloonToolbar___StyledToolbarBase",
  componentId: "sc-8umnsm-0"
})(["", ""], p => p.$_css);

const getHeadingToolbarStyles = props => plateStyledComponents.createStyles({
  prefixClassNames: 'HeadingToolbar',
  ...props
}, [{
  root: [...getToolbarStyles(props).root.css, {
    "position": "relative",
    "flexWrap": "wrap",
    "marginTop": "0px",
    "marginBottom": "1.25rem",
    "marginLeft": "-1.25rem",
    "marginRight": "-1.25rem"
  }, _styled.css(["padding:1px 18px 17px;border-bottom:2px solid #eee;.slate-ToolbarButton-active,.slate-ToolbarButton:hover{color:#06c;}"])]
}]);

const HeadingToolbar = /*#__PURE__*/React__default['default'].forwardRef((props, ref) => {
  const styles = getHeadingToolbarStyles(props);
  return /*#__PURE__*/React__default['default'].createElement(_StyledToolbarBase, _extends({
    ref: ref,
    className: styles.root.className
  }, props, {
    $_css: styles.root.css
  }));
});

var _StyledToolbarBase = _styled__default['default'](ToolbarBase).withConfig({
  displayName: "HeadingToolbar___StyledToolbarBase",
  componentId: "sc-g9jzcf-0"
})(["", ""], p => p.$_css);

const getToolbarButtonStyles = props => plateStyledComponents.createStyles({
  prefixClassNames: 'ToolbarButton',
  ...props
}, {
  root: [{
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "userSelect": "none",
    "cursor": "pointer",
    "verticalAlign": "middle"
  }, {
    "width": "28px",
    "height": "24px"
  }, _styled.css(["> svg{", "}"], {
    "display": "block",
    "width": "1.25rem",
    "height": "1.25rem"
  })],
  ...(props.active && {
    active: {}
  })
});

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

const ToolbarButton = props => {
  const {
    icon,
    tooltip,
    onMouseDown,
    as = 'span'
  } = props;
  const spanProps = {
    onMouseDown
  };
  const tooltipProps = {
    content: '',
    arrow: true,
    offset: [0, 17],
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    ...tooltip
  };
  const {
    root,
    active
  } = getToolbarButtonStyles(props);
  const button = /*#__PURE__*/React__default['default'].createElement(_StyledSpan, _extends({
    "data-testid": "ToolbarButton",
    as: as,
    className: clsx(root.className, active === null || active === void 0 ? void 0 : active.className)
  }, spanProps, {
    $_css: root.css
  }), icon);
  return tooltip ? /*#__PURE__*/React__default['default'].createElement(Tippy__default['default'], tooltipProps, button) : button;
};

var _StyledSpan = _styled__default['default']("span").withConfig({
  displayName: "ToolbarButton___StyledSpan",
  componentId: "sc-15em9do-0"
})(["", ""], p => p.$_css);

const ToolbarDropdown = ({
  control,
  children,
  onClose
}) => {
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const listener = ev => {
      if (open) {
        if (referenceElement && ev.composedPath().includes(referenceElement)) {
          return;
        }

        if (popperElement && ev.composedPath().includes(popperElement)) {
          return;
        }

        setOpen(false);
        onClose === null || onClose === void 0 ? void 0 : onClose(ev);
      }
    };

    document.body.addEventListener('mousedown', listener);
    return () => {
      document.body.removeEventListener('mousedown', listener);
    };
  }, [onClose, open, popperElement, referenceElement, setOpen]);
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", {
    ref: setReferenceElement,
    onMouseDown: () => setOpen(true)
  }, control), /*#__PURE__*/React__default['default'].createElement(_StyledDiv, {
    ref: setPopperElement,
    $_css: [{
      "position": "absolute",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
      "top": "2.5rem"
    }, !open && {
      "display": "none"
    }, _styled.css(["border:1px solid #ccc;box-shadow:0 1px 3px 0 #ccc;z-index:1;"])]
  }, children));
};

var _StyledDiv = _styled__default['default']("div").withConfig({
  displayName: "ToolbarDropdown___StyledDiv",
  componentId: "sc-3ansxp-0"
})(["", ""], p => p.$_css);

/**
 * Toolbar button to toggle the type of elements in selection.
 */
const ToolbarElement = ({
  type,
  inactiveType,
  active,
  ...props
}) => {
  const editor = plateCore.useStoreEditorState(plateCore.useEventEditorId('focus'));
  return /*#__PURE__*/React__default['default'].createElement(ToolbarButton, _extends({
    active: active !== null && active !== void 0 ? active : !!(editor !== null && editor !== void 0 && editor.selection) && plateCommon.someNode(editor, {
      match: {
        type
      }
    }),
    onMouseDown: editor && plateCommon.getPreventDefaultHandler(plateCommon.toggleNodeType, editor, {
      activeType: type,
      inactiveType
    })
  }, props));
};

/**
 * Toolbar button to toggle the mark of the leaves in selection.
 */
const ToolbarMark = ({
  type,
  clear,
  ...props
}) => {
  const editor = plateCore.useStoreEditorState(plateCore.useEventEditorId('focus'));
  return /*#__PURE__*/React__default['default'].createElement(ToolbarButton, _extends({
    active: !!(editor !== null && editor !== void 0 && editor.selection) && plateCommon.isMarkActive(editor, type),
    onMouseDown: editor ? plateCommon.getPreventDefaultHandler(plateCommon.toggleMark, editor, type, clear) : undefined
  }, props));
};

exports.BalloonToolbar = BalloonToolbar;
exports.HeadingToolbar = HeadingToolbar;
exports.Toolbar = Toolbar;
exports.ToolbarBase = ToolbarBase;
exports.ToolbarButton = ToolbarButton;
exports.ToolbarDropdown = ToolbarDropdown;
exports.ToolbarElement = ToolbarElement;
exports.ToolbarMark = ToolbarMark;
exports.getBalloonToolbarStyles = getBalloonToolbarStyles;
exports.getHeadingToolbarStyles = getHeadingToolbarStyles;
exports.getToolbarButtonStyles = getToolbarButtonStyles;
exports.getToolbarStyles = getToolbarStyles;
exports.useBalloonToolbarPopper = useBalloonToolbarPopper;
//# sourceMappingURL=index.js.map
