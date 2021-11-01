'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCore = require('@udecode/plate-core');
var plateCommon = require('@udecode/plate-common');
var slate = require('slate');
var plateCombobox = require('@udecode/plate-combobox');
var slateHistory = require('slate-history');

const ELEMENT_MENTION_INPUT = 'mention_input';
const ELEMENT_MENTION = 'mention';
const COMBOBOX_TRIGGER_MENTION = '@';

const getMentionDeserialize = (pluginKey = ELEMENT_MENTION) => editor => {
  const options = plateCore.getPlatePluginOptions(editor, pluginKey);
  return {
    element: plateCommon.getNodeDeserializer({
      type: options.type,
      getNode: el => ({
        type: options.type,
        value: el.getAttribute('data-slate-value')
      }),
      rules: [{
        className: plateCore.getSlateClass(options.type)
      }],
      ...options.deserialize
    })
  };
};

const moveSelectionByOffset = (editor, {
  query = () => true
}) => event => {
  const {
    selection
  } = editor;

  if (!selection || slate.Range.isExpanded(selection) || !query(editor)) {
    return false;
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    slate.Transforms.move(editor, {
      unit: 'offset',
      reverse: true
    });
    return true;
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    slate.Transforms.move(editor, {
      unit: 'offset'
    });
    return true;
  }
};

const getMentionInputType = editor => plateCore.getPlatePluginType(editor, ELEMENT_MENTION_INPUT);

const getMentionInputPluginOptions = editor => plateCore.getPlatePluginOptions(editor, ELEMENT_MENTION_INPUT);

const findMentionInput = (editor, options) => plateCommon.findNode(editor, { ...options,
  match: {
    type: getMentionInputType(editor)
  }
});

const isNodeMentionInput = (editor, node) => node.type === getMentionInputType(editor);

const isSelectionInMentionInput = editor => findMentionInput(editor) !== undefined;

const removeMentionInput = (editor, path) => slate.Editor.withoutNormalizing(editor, () => {
  const {
    trigger
  } = slate.Node.get(editor, path);
  slate.Transforms.insertText(editor, trigger, {
    at: {
      path: [...path, 0],
      offset: 0
    }
  });
  slate.Transforms.unwrapNodes(editor, {
    at: path
  });
});

const withMention = ({
  id,
  trigger
}) => editor => {
  const {
    apply,
    insertText,
    deleteBackward
  } = editor;

  editor.deleteBackward = unit => {
    const currentMentionInput = findMentionInput(editor);

    if (currentMentionInput && slate.Node.string(currentMentionInput[0]) === '') {
      return removeMentionInput(editor, currentMentionInput[1]);
    }

    deleteBackward(unit);
  };

  editor.insertText = text => {
    if (isSelectionInMentionInput(editor)) {
      return slate.Transforms.insertText(editor, text);
    }

    if (!editor.selection || text !== trigger) {
      return insertText(text);
    } // Make sure a mention input is created at the beginning of line or after a whitespace


    const previousCharLocation = slate.Editor.before(editor, editor.selection);

    if (previousCharLocation) {
      const previousChar = slate.Editor.string(editor, slate.Editor.range(editor, editor.selection, previousCharLocation));

      if (previousChar !== '' && previousChar !== ' ') {
        return insertText(text);
      }
    }

    plateCommon.insertNodes(editor, {
      type: getMentionInputType(editor),
      children: [{
        text: ''
      }],
      trigger
    });
  };

  editor.apply = operation => {
    if (slateHistory.HistoryEditor.isHistoryEditor(editor) && findMentionInput(editor)) {
      slateHistory.HistoryEditor.withoutSaving(editor, () => apply(operation));
    } else {
      apply(operation);
    }

    if (operation.type === 'insert_text' || operation.type === 'remove_text') {
      const currentMentionInput = findMentionInput(editor);

      if (currentMentionInput) {
        plateCombobox.comboboxStore.set.text(slate.Node.string(currentMentionInput[0]));
      }
    } else if (operation.type === 'set_selection') {
      var _findMentionInput, _findMentionInput2;

      const previousMentionInputPath = slate.Range.isRange(operation.properties) ? (_findMentionInput = findMentionInput(editor, {
        at: operation.properties
      })) === null || _findMentionInput === void 0 ? void 0 : _findMentionInput[1] : undefined;
      const currentMentionInputPath = slate.Range.isRange(operation.newProperties) ? (_findMentionInput2 = findMentionInput(editor, {
        at: operation.newProperties
      })) === null || _findMentionInput2 === void 0 ? void 0 : _findMentionInput2[1] : undefined;

      if (previousMentionInputPath && !currentMentionInputPath) {
        removeMentionInput(editor, previousMentionInputPath);
      }

      if (currentMentionInputPath) {
        plateCombobox.comboboxStore.set.targetRange(editor.selection);
      }
    } else if (operation.type === 'insert_node' && isNodeMentionInput(editor, operation.node)) {
      if (operation.node.trigger !== trigger) {
        return;
      }

      plateCombobox.comboboxStore.set.open({
        activeId: id,
        text: '',
        targetRange: editor.selection
      });
    } else if (operation.type === 'remove_node' && isNodeMentionInput(editor, operation.node)) {
      if (operation.node.trigger !== trigger) {
        return;
      }

      plateCombobox.comboboxStore.set.reset();
    }
  };

  return editor;
};

/**
 * Enables support for autocompleting @mentions.
 */

const createMentionPlugin = ({
  pluginKey = ELEMENT_MENTION,
  trigger = COMBOBOX_TRIGGER_MENTION
} = {}) => ({
  pluginKeys: [pluginKey, ELEMENT_MENTION_INPUT],
  renderElement: plateCore.getRenderElement([pluginKey, ELEMENT_MENTION_INPUT]),
  deserialize: getMentionDeserialize(pluginKey),
  inlineTypes: plateCore.getPlatePluginTypes([pluginKey, ELEMENT_MENTION_INPUT]),
  voidTypes: plateCore.getPlatePluginTypes(pluginKey),
  withOverrides: withMention({
    id: pluginKey,
    trigger
  }),
  onKeyDown: editor => moveSelectionByOffset(editor, {
    query: isSelectionInMentionInput
  })
});

// import { MentionNodeData } from './types';

const getMentionOnSelectItem = ({
  pluginKey = ELEMENT_MENTION,
  createMentionNode = item => ({
    value: item.text
  }),
  insertSpaceAfterMention
} = {}) => (editor, item) => {
  var _getBlockAbove;

  const targetRange = plateCombobox.comboboxStore.get.targetRange();
  if (!targetRange) return;
  const type = plateCore.getPlatePluginType(editor, pluginKey);
  const pathAbove = (_getBlockAbove = plateCommon.getBlockAbove(editor)) === null || _getBlockAbove === void 0 ? void 0 : _getBlockAbove[1];
  const isBlockEnd = editor.selection && pathAbove && slate.Editor.isEnd(editor, editor.selection.anchor, pathAbove);
  slate.Editor.withoutNormalizing(editor, () => {
    // insert a space to fix the bug
    if (isBlockEnd) {
      slate.Transforms.insertText(editor, ' ');
    } // select the text and insert the element


    slate.Transforms.select(editor, targetRange);
    slate.Transforms.removeNodes(editor, {
      // TODO: replace any
      match: node => node.type === ELEMENT_MENTION_INPUT
    });
    plateCommon.insertNodes(editor, {
      type,
      children: [{
        text: ''
      }],
      ...createMentionNode(item)
    }); // move the selection after the element

    slate.Transforms.move(editor); // delete the inserted space

    if (isBlockEnd && !insertSpaceAfterMention) {
      slate.Transforms.delete(editor);
    }
  });
  return plateCombobox.comboboxStore.set.reset();
};

exports.COMBOBOX_TRIGGER_MENTION = COMBOBOX_TRIGGER_MENTION;
exports.ELEMENT_MENTION = ELEMENT_MENTION;
exports.ELEMENT_MENTION_INPUT = ELEMENT_MENTION_INPUT;
exports.createMentionPlugin = createMentionPlugin;
exports.findMentionInput = findMentionInput;
exports.getMentionDeserialize = getMentionDeserialize;
exports.getMentionInputPluginOptions = getMentionInputPluginOptions;
exports.getMentionInputType = getMentionInputType;
exports.getMentionOnSelectItem = getMentionOnSelectItem;
exports.isNodeMentionInput = isNodeMentionInput;
exports.isSelectionInMentionInput = isSelectionInMentionInput;
exports.moveSelectionByOffset = moveSelectionByOffset;
//# sourceMappingURL=index.js.map
