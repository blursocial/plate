import { HistoryEditor } from 'slate-history/dist/history-editor';
import { ReactEditor } from 'slate-react';
import { SPEditor } from '../../../types/SPEditor';
/**
 * Get editor state which is updated on editor change.
 */
export declare const useStoreEditorState: <T extends SPEditor = SPEditor & ReactEditor & HistoryEditor>(id?: string | null | undefined) => (SPEditor & ReactEditor & HistoryEditor) | undefined;
//# sourceMappingURL=useStoreEditorState.d.ts.map