import { EditorNodesOptions } from '@udecode/plate-common/src';
import { SPEditor } from '@udecode/plate-core';
export declare type MoveListItemsOptions = {
    increase?: boolean;
    at?: EditorNodesOptions['at'];
};
export declare const moveListItems: (editor: SPEditor, { increase, at, }?: MoveListItemsOptions) => void;
//# sourceMappingURL=moveListItems.d.ts.map