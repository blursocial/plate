import { HistoryEditor } from 'slate-history/dist/history-editor';
import { ReactEditor } from 'slate-react';
import { SPEditor } from '../types/SPEditor';
import { TEditor } from '../types/TEditor';
/**
 * Typed {@link useSlateStatic} & SPEditor.
 * Needs to be called in a child component of `Plate`.
 * Else, use `useStoreEditorRef`.
 */
export declare const useEditorRef: <T extends TEditor<import("..").AnyObject> = ReactEditor & HistoryEditor>() => T & SPEditor;
//# sourceMappingURL=useEditorRef.d.ts.map