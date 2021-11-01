import { SPEditor, TElement } from '@udecode/plate-core';
import { NodeEntry } from 'slate';
export interface RemoveListItemOptions {
    list: NodeEntry<TElement>;
    listItem: NodeEntry<TElement>;
    reverse?: boolean;
}
/**
 * Remove list item and move its sublist to list if any.
 */
export declare const removeListItem: (editor: SPEditor, { list, listItem, reverse }: RemoveListItemOptions) => boolean;
//# sourceMappingURL=removeListItem.d.ts.map