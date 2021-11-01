import { MoveChildrenOptions } from '@udecode/plate-common';
import { SPEditor, TElement } from '@udecode/plate-core';
import { NodeEntry, Path } from 'slate';
export interface MergeListItemIntoListOptions {
    /**
     * List items of the sublist of this node will be moved.
     */
    fromListItem?: NodeEntry<TElement>;
    /**
     * List items of the list will be moved.
     */
    fromList?: NodeEntry<TElement>;
    /**
     * List items will be moved in this list.
     */
    toList?: NodeEntry<TElement>;
    fromStartIndex?: MoveChildrenOptions['fromStartIndex'];
    /**
     * List position where to move the list items.
     */
    toListIndex?: number | null;
    to?: Path;
    /**
     * Delete `fromListItem` sublist if true.
     * @default true
     */
    deleteFromList?: boolean;
}
/**
 * Move the list items of the sublist of `fromListItem` to `toList` (if `fromListItem` is defined).
 * Move the list items of `fromList` to `toList` (if `fromList` is defined).
 */
export declare const moveListItemsToList: (editor: SPEditor, { fromList, fromListItem, fromStartIndex, to: _to, toList, toListIndex, deleteFromList, }: MergeListItemIntoListOptions) => undefined;
//# sourceMappingURL=moveListItemsToList.d.ts.map