import { HistoryEditor } from 'slate-history/dist/history-editor';
import { ReactEditor } from 'slate-react';
import { SPEditor } from '../types/SPEditor';
import { TEditor } from '../types/TEditor';
/**
 * Typed {@link useSlate} & SPEditor.
 * Needs to be called in a child component of `Plate`.
 * Else, use `useStoreEditorState`.
 */
export declare const useEditorState: <T extends TEditor<import("..").AnyObject> = ReactEditor & HistoryEditor>() => T & SPEditor;
//# sourceMappingURL=useEditorState.d.ts.map