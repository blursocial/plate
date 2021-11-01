import { createStore } from '@udecode/zustood';
import { escapeRegExp, getText, isCollapsed, isDefined } from '@udecode/plate-common';
import { Editor, Range } from 'slate';
import { createStyles, PortalBody } from '@udecode/plate-styled-components';
import _styled, { css } from 'styled-components';
import React, { useMemo, useEffect, useCallback } from 'react';
import { useEditorState, useEventEditorId } from '@udecode/plate-core';
import { getRangeBoundingClientRect, virtualReference, usePopperPosition } from '@udecode/plate-popper';
import { useCombobox } from 'downshift';

const createComboboxStore = state => createStore(`combobox-${state.id}`)(state);

const comboboxStore = createStore('combobox')({
  activeId: null,
  byId: {},
  highlightedIndex: 0,
  items: [],
  filteredItems: [],
  targetRange: null,
  text: null
}).extendActions((set, get) => ({
  setComboboxById: state => {
    if (get.byId()[state.id]) return;
    set.state(draft => {
      draft.byId[state.id] = createComboboxStore(state);
    });
  },
  open: state => {
    set.mergeState(state);
  },
  reset: () => {
    set.state(draft => {
      draft.activeId = null;
      draft.highlightedIndex = 0;
      draft.items = [];
      draft.text = null;
      draft.targetRange = null;
    });
  }
})).extendSelectors(state => ({
  isOpen: () => !!state.activeId
}));
const getComboboxStoreById = id => id ? comboboxStore.get.byId()[id] : null;
const useActiveComboboxStore = () => {
  const activeId = comboboxStore.use.activeId();
  const comboboxes = comboboxStore.use.byId();
  return activeId ? comboboxes[activeId] : null;
};

/**
 * Get text and range from trigger to cursor.
 * Starts with trigger and ends with non-whitespace character.
 */

const getTextFromTrigger = (editor, {
  at,
  trigger,
  searchPattern = `\\S+`
}) => {
  const escapedTrigger = escapeRegExp(trigger);
  const triggerRegex = new RegExp(`(?:^|\\s)${escapedTrigger}`);
  let start = at;
  let end;

  while (true) {
    end = start;
    if (!start) break;
    start = Editor.before(editor, start);
    const charRange = start && Editor.range(editor, start, end);
    const charText = getText(editor, charRange);

    if (!charText.match(searchPattern)) {
      start = end;
      break;
    }
  } // Range from start to cursor


  const range = start && Editor.range(editor, start, at);
  const text = getText(editor, range);
  if (!range || !text.match(triggerRegex)) return;
  return {
    range,
    textAfterTrigger: text.substring(1)
  };
}; // export const matchesTriggerAndPattern = (
//   editor: TEditor,
//   { at, trigger, pattern }: { at: Point; trigger: string; pattern: string }
// ) => {
//   // Point at the start of line
//   const lineStart = Editor.before(editor, at, { unit: 'line' });
//
//   // Range from before to start
//   const beforeRange = lineStart && Editor.range(editor, lineStart, at);
//
//   // Before text
//   const beforeText = getText(editor, beforeRange);
//
//   // Starts with char and ends with word characters
//   const escapedTrigger = escapeRegExp(trigger);
//
//   const beforeRegex = new RegExp(`(?:^|\\s)${escapedTrigger}(${pattern})$`);
//
//   // Match regex on before text
//   const match = !!beforeText && beforeText.match(beforeRegex);
//
//   // Point at the start of mention
//   const mentionStart = match
//     ? Editor.before(editor, at, {
//         unit: 'character',
//         distance: match[1].length + trigger.length,
//       })
//     : null;
//
//   // Range from mention to start
//   const mentionRange = mentionStart && Editor.range(editor, mentionStart, at);
//
//   return {
//     range: mentionRange,
//     match,
//   };
// };

/**
 * For each combobox state (byId):
 * - if the selection is collapsed
 * - if the cursor follows the trigger
 * - if there is text without whitespaces after the trigger
 * - open the combobox: set id, search, targetRange in the store
 * Close the combobox if needed
 */

const getComboboxOnChange = () => editor => () => {
  const byId = comboboxStore.get.byId();
  const activeId = comboboxStore.get.activeId();
  let shouldClose = true;

  for (const store of Object.values(byId)) {
    var _store$get$controlled, _store$get, _store$get$searchPatt, _store$get2;

    const id = store.get.id();
    const controlled = (_store$get$controlled = (_store$get = store.get).controlled) === null || _store$get$controlled === void 0 ? void 0 : _store$get$controlled.call(_store$get);

    if (controlled) {
      // do not close controlled comboboxes
      if (activeId === id) {
        shouldClose = false;
        break;
      } else {
        // do not open controlled comboboxes
        continue;
      }
    }

    const {
      selection
    } = editor;

    if (!selection || !isCollapsed(selection)) {
      continue;
    }

    const trigger = store.get.trigger();
    const searchPattern = (_store$get$searchPatt = (_store$get2 = store.get).searchPattern) === null || _store$get$searchPatt === void 0 ? void 0 : _store$get$searchPatt.call(_store$get2);
    const isCursorAfterTrigger = getTextFromTrigger(editor, {
      at: Range.start(selection),
      trigger,
      searchPattern
    });

    if (!isCursorAfterTrigger) {
      continue;
    }

    const {
      range,
      textAfterTrigger
    } = isCursorAfterTrigger;
    comboboxStore.set.open({
      activeId: id,
      text: textAfterTrigger,
      targetRange: range
    });
    shouldClose = false;
    break;
  }

  if (shouldClose && comboboxStore.get.isOpen()) {
    comboboxStore.set.reset();
  }
};

/**
 * Returns the next index in the list of an item that is not disabled.
 *
 * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
 * @param {number} baseIndex The initial position to move from.
 * @param {number} itemCount The total number of items.
 * @param {Function} getItemNodeFromIndex Used to check if item is disabled.
 * @param {boolean} circular Specify if navigation is circular. Default is true.
 * @returns {number} The new index. Returns baseIndex if item is not disabled. Returns next non-disabled item otherwise. If no non-disabled found it will return -1.
 */
const getNextNonDisabledIndex = (moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) => {
  const currentElementNode = getItemNodeFromIndex(baseIndex);

  if (!currentElementNode || !currentElementNode.hasAttribute('disabled')) {
    return baseIndex;
  }

  if (moveAmount > 0) {
    for (let index = baseIndex + 1; index < itemCount; index++) {
      if (!getItemNodeFromIndex(index).hasAttribute('disabled')) {
        return index;
      }
    }
  } else {
    for (let index = baseIndex - 1; index >= 0; index--) {
      if (!getItemNodeFromIndex(index).hasAttribute('disabled')) {
        return index;
      }
    }
  }

  if (circular) {
    return moveAmount > 0 ? getNextNonDisabledIndex(1, 0, itemCount, getItemNodeFromIndex, false) : getNextNonDisabledIndex(-1, itemCount - 1, itemCount, getItemNodeFromIndex, false);
  }

  return -1;
};

/**
 * Returns the new index in the list, in a circular way. If next value is out of bonds from the total,
 * it will wrap to either 0 or itemCount - 1.
 *
 * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
 * @param {number} baseIndex The initial position to move from.
 * @param {number} itemCount The total number of items.
 * @param {Function} getItemNodeFromIndex Used to check if item is disabled.
 * @param {boolean} circular Specify if navigation is circular. Default is true.
 * @returns {number} The new index after the move.
 */

const getNextWrappingIndex = (moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular = true) => {
  if (itemCount === 0) {
    return -1;
  }

  const itemsLastIndex = itemCount - 1; // noinspection SuspiciousTypeOfGuard

  if (typeof baseIndex !== 'number' || baseIndex < 0 || baseIndex >= itemCount) {
    baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1;
  }

  let newIndex = baseIndex + moveAmount;

  if (newIndex < 0) {
    newIndex = circular ? itemsLastIndex : 0;
  } else if (newIndex > itemsLastIndex) {
    newIndex = circular ? 0 : itemsLastIndex;
  }

  const nonDisabledNewIndex = getNextNonDisabledIndex(moveAmount, newIndex, itemCount, getItemNodeFromIndex, circular);

  if (nonDisabledNewIndex === -1) {
    return baseIndex >= itemCount ? -1 : baseIndex;
  }

  return nonDisabledNewIndex;
};

/**
 * If the combobox is open, handle:
 * - down (next item)
 * - up (previous item)
 * - escape (reset combobox)
 * - tab, enter (select item)
 */

const getComboboxOnKeyDown = () => editor => event => {
  const {
    highlightedIndex,
    filteredItems,
    activeId
  } = comboboxStore.get.state();
  const isOpen = comboboxStore.get.isOpen();
  if (!isOpen) return;
  const store = getComboboxStoreById(activeId);
  if (!store) return;
  const onSelectItem = store.get.onSelectItem();

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    const newIndex = getNextWrappingIndex(1, highlightedIndex, filteredItems.length, () => {}, true);
    comboboxStore.set.highlightedIndex(newIndex);
    return;
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    const newIndex = getNextWrappingIndex(-1, highlightedIndex, filteredItems.length, () => {}, true);
    comboboxStore.set.highlightedIndex(newIndex);
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    comboboxStore.set.reset();
    return;
  }

  if (['Tab', 'Enter'].includes(event.key)) {
    event.preventDefault();

    if (filteredItems[highlightedIndex]) {
      onSelectItem === null || onSelectItem === void 0 ? void 0 : onSelectItem(editor, filteredItems[highlightedIndex]);
    }
  }
};

const createComboboxPlugin = () => ({
  onChange: getComboboxOnChange(),
  onKeyDown: getComboboxOnKeyDown()
});

const getComboboxStyles = props => {
  const item = [{
    "display": "flex",
    "alignItems": "center",
    "paddingLeft": "0.5rem",
    "paddingRight": "0.5rem",
    "cursor": "pointer"
  }, css(["font-size:14px;border-radius:0;min-height:36px;user-select:none;color:rgb(32,31,30);"])];
  return createStyles({
    prefixClassNames: 'Combobox',
    ...props
  }, [{
    root: [{
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
      "margin": "0px",
      "padding": "0px",
      "overflow": "scroll"
    }, css(["width:300px;max-height:288px;border-radius:0 0 2px 2px;box-shadow:rgba(0,0,0,0.133) 0 3.2px 7.2px 0,rgba(0,0,0,0.11) 0 0.6px 1.8px 0;z-index:500;"])],
    item: [...item, css(["background:transparent;:hover{background:rgb(243,242,241);}"])],
    highlightedItem: [...item, css(["background:rgb(237,235,233);:hover{background:rgb(237,235,233);}"])]
  }]);
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

const useComboboxControls = () => {
  const isOpen = comboboxStore.use.isOpen();
  const highlightedIndex = comboboxStore.use.highlightedIndex();
  const filteredItems = comboboxStore.use.filteredItems();
  const {
    closeMenu,
    getMenuProps,
    getComboboxProps,
    getInputProps,
    getItemProps
  } = useCombobox({
    isOpen,
    highlightedIndex,
    items: filteredItems,
    circularNavigation: true
  });
  getMenuProps({}, {
    suppressRefError: true
  });
  getComboboxProps({}, {
    suppressRefError: true
  });
  getInputProps({}, {
    suppressRefError: true
  });
  return useMemo(() => ({
    closeMenu,
    getMenuProps,
    getItemProps
  }), [closeMenu, getItemProps, getMenuProps]);
};

const ComboboxContent = props => {
  var _comboboxStore$use$po, _comboboxStore$use, _comboboxStore$use$po2, _comboboxStore$use2, _activeComboboxStore$, _activeComboboxStore$2, _activeComboboxStore$3, _activeComboboxStore$4, _activeComboboxStore$5;

  const {
    component: Component,
    items,
    onRenderItem
  } = props;
  const targetRange = comboboxStore.use.targetRange();
  const filteredItems = comboboxStore.use.filteredItems();
  const highlightedIndex = comboboxStore.use.highlightedIndex();
  const popperContainer = (_comboboxStore$use$po = (_comboboxStore$use = comboboxStore.use).popperContainer) === null || _comboboxStore$use$po === void 0 ? void 0 : _comboboxStore$use$po.call(_comboboxStore$use);
  const popperOptions = (_comboboxStore$use$po2 = (_comboboxStore$use2 = comboboxStore.use).popperOptions) === null || _comboboxStore$use$po2 === void 0 ? void 0 : _comboboxStore$use$po2.call(_comboboxStore$use2);
  const editor = useEditorState();
  const combobox = useComboboxControls();
  const activeComboboxStore = useActiveComboboxStore();
  const text = comboboxStore.use.text();
  const storeItems = comboboxStore.use.items();
  const filter = (_activeComboboxStore$ = (_activeComboboxStore$2 = activeComboboxStore.use).filter) === null || _activeComboboxStore$ === void 0 ? void 0 : _activeComboboxStore$.call(_activeComboboxStore$2);
  const maxSuggestions = (_activeComboboxStore$3 = (_activeComboboxStore$4 = (_activeComboboxStore$5 = activeComboboxStore.use).maxSuggestions) === null || _activeComboboxStore$4 === void 0 ? void 0 : _activeComboboxStore$4.call(_activeComboboxStore$5)) !== null && _activeComboboxStore$3 !== void 0 ? _activeComboboxStore$3 : storeItems.length;
  const popperRef = React.useRef(null); // Update items

  useEffect(() => {
    items && comboboxStore.set.items(items);
  }, [items]); // Filter items

  useEffect(() => {
    if (!isDefined(text)) return;

    if (text.length === 0) {
      return comboboxStore.set.filteredItems(storeItems.slice(0, maxSuggestions));
    }

    const _filteredItems = storeItems.filter(filter ? filter(text) : value => value.text.toLowerCase().startsWith(text.toLowerCase())).slice(0, maxSuggestions);

    comboboxStore.set.filteredItems(_filteredItems);
  }, [filter, storeItems, maxSuggestions, text]); // Get target range rect

  const getBoundingClientRect = useCallback(() => {
    var _getRangeBoundingClie;

    return (_getRangeBoundingClie = getRangeBoundingClientRect(editor, targetRange)) !== null && _getRangeBoundingClie !== void 0 ? _getRangeBoundingClie : virtualReference;
  }, [editor, targetRange]); // Update popper position

  const {
    styles: popperStyles,
    attributes
  } = usePopperPosition({
    popperElement: popperRef.current,
    popperContainer,
    popperOptions,
    placement: 'bottom-start',
    getBoundingClientRect,
    offset: [0, 4]
  });
  const menuProps = combobox ? combobox.getMenuProps({}, {
    suppressRefError: true
  }) : {
    ref: null
  };
  const {
    root,
    item: styleItem,
    highlightedItem
  } = getComboboxStyles(props);
  return /*#__PURE__*/React.createElement(PortalBody, null, /*#__PURE__*/React.createElement(_StyledUl, _extends({}, menuProps, {
    ref: popperRef,
    style: popperStyles.popper,
    className: root.className
  }, attributes.popper, {
    $_css: root.css
  }), Component ? Component({
    store: activeComboboxStore
  }) : null, filteredItems.map((item, index) => {
    const Item = onRenderItem ? onRenderItem({
      item
    }) : item.text;
    const highlighted = index === highlightedIndex;
    return /*#__PURE__*/React.createElement(_StyledDiv, _extends({
      key: item.key,
      className: !highlighted ? styleItem === null || styleItem === void 0 ? void 0 : styleItem.className : highlightedItem === null || highlightedItem === void 0 ? void 0 : highlightedItem.css
    }, combobox.getItemProps({
      item,
      index
    }), {
      onMouseDown: e => {
        var _getComboboxStoreById;

        e.preventDefault();
        const onSelectItem = (_getComboboxStoreById = getComboboxStoreById(comboboxStore.get.activeId())) === null || _getComboboxStoreById === void 0 ? void 0 : _getComboboxStoreById.get.onSelectItem();
        onSelectItem === null || onSelectItem === void 0 ? void 0 : onSelectItem(editor, item);
      },
      $_css2: !highlighted ? styleItem === null || styleItem === void 0 ? void 0 : styleItem.css : highlightedItem === null || highlightedItem === void 0 ? void 0 : highlightedItem.css
    }), Item);
  })));
};
/**
 * Register the combobox id, trigger, onSelectItem
 * Renders the combobox if active.
 */


const Combobox = ({
  id,
  trigger,
  searchPattern,
  onSelectItem,
  controlled,
  ...props
}) => {
  const editor = useEditorState();
  const focusedEditorId = useEventEditorId('focus');
  const combobox = useComboboxControls();
  const activeId = comboboxStore.use.activeId();
  useEffect(() => {
    comboboxStore.set.setComboboxById({
      id,
      trigger,
      searchPattern,
      controlled,
      onSelectItem
    });
  }, [id, trigger, searchPattern, controlled, onSelectItem]);

  if (!combobox || !editor.selection || focusedEditorId !== editor.id || activeId !== id) {
    return null;
  }

  return /*#__PURE__*/React.createElement(ComboboxContent, props);
};

var _StyledUl = _styled("ul").withConfig({
  displayName: "Combobox___StyledUl",
  componentId: "sc-1opa621-0"
})(["", ""], p => p.$_css);

var _StyledDiv = _styled("div").withConfig({
  displayName: "Combobox___StyledDiv",
  componentId: "sc-1opa621-1"
})(["", ""], p => p.$_css2);

export { Combobox, comboboxStore, createComboboxPlugin, getComboboxOnChange, getComboboxOnKeyDown, getComboboxStoreById, getComboboxStyles, getNextNonDisabledIndex, getNextWrappingIndex, getTextFromTrigger, useActiveComboboxStore, useComboboxControls };
//# sourceMappingURL=index.es.js.map
