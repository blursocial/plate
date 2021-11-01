/// <reference types="react" />
import { ComboboxProps } from '@udecode/plate-combobox';
import { PlatePluginKey } from '@udecode/plate-core';
import { CreateMentionNode } from '@udecode/plate-mention';
export declare const MentionCombobox: ({ items, component, onRenderItem, pluginKey, id, trigger, insertSpaceAfterMention, createMentionNode, }: Pick<ComboboxProps, "component" | "items" | "onRenderItem"> & {
    id?: string | undefined;
    trigger?: string | undefined;
    insertSpaceAfterMention?: boolean | undefined;
    createMentionNode?: CreateMentionNode | undefined;
} & PlatePluginKey) => JSX.Element;
//# sourceMappingURL=MentionCombobox.d.ts.map