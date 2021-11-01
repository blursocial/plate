import { SPEditor, TElement } from '@udecode/plate-core';
import { Location, NodeEntry } from 'slate';
/**
 * Returns the nearest li and ul / ol wrapping node entries for a given path (default = selection)
 */
export declare const getListItemEntry: (editor: SPEditor, { at }?: {
    at?: Location | null | undefined;
}) => {
    list: NodeEntry<TElement>;
    listItem: NodeEntry<TElement>;
} | undefined;
//# sourceMappingURL=getListItemEntry.d.ts.map