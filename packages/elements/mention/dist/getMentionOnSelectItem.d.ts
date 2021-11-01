import { ComboboxItemData, ComboboxOnSelectItem } from '@udecode/plate-combobox';
import { PlatePluginKey } from '@udecode/plate-core';
export interface CreateMentionNode {
    (item: ComboboxItemData): Record<string, unknown>;
}
export declare const getMentionOnSelectItem: ({ pluginKey, createMentionNode, insertSpaceAfterMention, }?: {
    createMentionNode?: CreateMentionNode | undefined;
    insertSpaceAfterMention?: boolean | undefined;
} & PlatePluginKey) => ComboboxOnSelectItem;
//# sourceMappingURL=getMentionOnSelectItem.d.ts.map