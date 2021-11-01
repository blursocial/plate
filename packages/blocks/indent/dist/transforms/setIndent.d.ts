import { EditorNodesOptions, UnhangRangeOptions } from '@udecode/plate-common';
import { TEditor } from '@udecode/plate-core';
/**
 * Add offset to the indentation of the selected blocks.
 */
export declare const setIndent: (editor: TEditor, { offset, ...options }: EditorNodesOptions<import("@udecode/plate-core").TNode<import("@udecode/plate-core").AnyObject>> & UnhangRangeOptions & {
    offset: number;
}) => void;
//# sourceMappingURL=setIndent.d.ts.map