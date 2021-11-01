import { SPEditor, TElement } from '@udecode/plate-core';
import { NodeEntry } from 'slate';
export interface MoveListItemUpOptions {
    list: NodeEntry<TElement>;
    listItem: NodeEntry<TElement>;
}
/**
 * Move a list item up.
 */
export declare const moveListItemUp: (editor: SPEditor, { list, listItem }: MoveListItemUpOptions) => boolean;
//# sourceMappingURL=moveListItemUp.d.ts.map