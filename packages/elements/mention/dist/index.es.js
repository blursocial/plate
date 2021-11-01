import { getPlatePluginOptions, getSlateClass, getPlatePluginType, getRenderElement, getPlatePluginTypes } from '@udecode/plate-core';
import { getNodeDeserializer, findNode, insertNodes, getBlockAbove } from '@udecode/plate-common';
import { Range, Transforms, Editor, Node } from 'slate';
import { comboboxStore } from '@udecode/plate-combobox';
import { HistoryEditor } from 'slate-history';

const ELEMENT_MENTION_INPUT = 'mention_input';
const ELEMENT_MENTION = 'mention';
const COMBOBOX_TRIGGER_MENTION = '@';

const getMentionDeserialize = (pluginKey = ELEMENT_MENTION) => editor => {
  const options = getPlatePluginOptions(editor, pluginKey);
  return {
    element: getNodeDeserializer({
      type: options.type,
      getNode: el => ({
        type: options.type,
        value: el.getAttribute('data-slate-value')
      }),
      rules: [{
        className: getSlateClass(options.type)
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

  if (!selection || Range.isExpanded(selection) || !query(editor)) {
    return false;
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    Transforms.move(editor, {
      unit: 'offset',
      reverse: true
    });
    return true;
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    Transforms.move(editor, {
      unit: 'offset'
    });
    return true;
  }
};

const getMentionInputType = editor => getPlatePluginType(editor, ELEMENT_MENTION_INPUT);

const getMentionInputPluginOptions = editor => getPlatePluginOptions(editor, ELEMENT_MENTION_INPUT);

const findMentionInput = (editor, options) => findNode(editor, { ...options,
  match: {
    type: getMentionInputType(editor)
  }
});

const isNodeMentionInput = (editor, node) => node.type === getMentionInputType(editor);

const isSelectionInMentionInput = editor => findMentionInput(editor) !== undefined;

const removeMentionInput = (editor, path) => Editor.withoutNormalizing(editor, () => {
  const {
    trigger
  } = Node.get(editor, path);
  Transforms.insertText(editor, trigger, {
    at: {
      path: [...path, 0],
      offset: 0
    }
  });
  Transforms.unwrapNodes(editor, {
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

    if (currentMentionInput && Node.string(currentMentionInput[0]) === '') {
      return removeMentionInput(editor, currentMentionInput[1]);
    }

    deleteBackward(unit);
  };

  editor.insertText = text => {
    if (isSelectionInMentionInput(editor)) {
      return Transforms.insertText(editor, text);
    }

    if (!editor.selection || text !== trigger) {
      return insertText(text);
    } // Make sure a mention input is created at the beginning of line or after a whitespace


    const previousCharLocation = Editor.before(editor, editor.selection);

    if (previousCharLocation) {
      const previousChar = Editor.string(editor, Editor.range(editor, editor.selection, previousCharLocation));

      if (previousChar !== '' && previousChar !== ' ') {
        return insertText(text);
      }
    }

    insertNodes(editor, {
      type: getMentionInputType(editor),
      children: [{
        text: ''
      }],
      trigger
    });
  };

  editor.apply = operation => {
    if (HistoryEditor.isHistoryEditor(editor) && findMentionInput(editor)) {
      HistoryEditor.withoutSaving(editor, () => apply(operation));
    } else {
      apply(operation);
    }

    if (operation.type === 'insert_text' || operation.type === 'remove_text') {
      const currentMentionInput = findMentionInput(editor);

      if (currentMentionInput) {
        comboboxStore.set.text(Node.string(currentMentionInput[0]));
      }
    } else if (operation.type === 'set_selection') {
      var _findMentionInput, _findMentionInput2;

      const previousMentionInputPath = Range.isRange(operation.properties) ? (_findMentionInput = findMentionInput(editor, {
        at: operation.properties
      })) === null || _findMentionInput === void 0 ? void 0 : _findMentionInput[1] : undefined;
      const currentMentionInputPath = Range.isRange(operation.newProperties) ? (_findMentionInput2 = findMentionInput(editor, {
        at: operation.newProperties
      })) === null || _findMentionInput2 === void 0 ? void 0 : _findMentionInput2[1] : undefined;

      if (previousMentionInputPath && !currentMentionInputPath) {
        removeMentionInput(editor, previousMentionInputPath);
      }

      if (currentMentionInputPath) {
        comboboxStore.set.targetRange(editor.selection);
      }
    } else if (operation.type === 'insert_node' && isNodeMentionInput(editor, operation.node)) {
      if (operation.node.trigger !== trigger) {
        return;
      }

      comboboxStore.set.open({
        activeId: id,
        text: '',
        targetRange: editor.selection
      });
    } else if (operation.type === 'remove_node' && isNodeMentionInput(editor, operation.node)) {
      if (operation.node.trigger !== trigger) {
        return;
      }

      comboboxStore.set.reset();
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
  renderElement: getRenderElement([pluginKey, ELEMENT_MENTION_INPUT]),
  deserialize: getMentionDeserialize(pluginKey),
  inlineTypes: getPlatePluginTypes([pluginKey, ELEMENT_MENTION_INPUT]),
  voidTypes: getPlatePluginTypes(pluginKey),
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

  const targetRange = comboboxStore.get.targetRange();
  if (!targetRange) return;
  const type = getPlatePluginType(editor, pluginKey);
  const pathAbove = (_getBlockAbove = getBlockAbove(editor)) === null || _getBlockAbove === void 0 ? void 0 : _getBlockAbove[1];
  const isBlockEnd = editor.selection && pathAbove && Editor.isEnd(editor, editor.selection.anchor, pathAbove);
  Editor.withoutNormalizing(editor, () => {
    // insert a space to fix the bug
    if (isBlockEnd) {
      Transforms.insertText(editor, ' ');
    } // select the text and insert the element


    Transforms.select(editor, targetRange);
    Transforms.removeNodes(editor, {
      // TODO: replace any
      match: node => node.type === ELEMENT_MENTION_INPUT
    });
    insertNodes(editor, {
      type,
      children: [{
        text: ''
      }],
      ...createMentionNode(item)
    }); // move the selection after the element

    Transforms.move(editor); // delete the inserted space

    if (isBlockEnd && !insertSpaceAfterMention) {
      Transforms.delete(editor);
    }
  });
  return comboboxStore.set.reset();
};

export { COMBOBOX_TRIGGER_MENTION, ELEMENT_MENTION, ELEMENT_MENTION_INPUT, createMentionPlugin, findMentionInput, getMentionDeserialize, getMentionInputPluginOptions, getMentionInputType, getMentionOnSelectItem, isNodeMentionInput, isSelectionInMentionInput, moveSelectionByOffset };
//# sourceMappingURL=index.es.js.map
