import { HistoryEditor } from 'slate-history/dist/history-editor';
import { ReactEditor } from 'slate-react';
import { SPEditor } from '../../../types/SPEditor';
/**
 * Get editor ref which is never updated.
 */
export declare const useStoreEditorRef: <T extends SPEditor = SPEditor & ReactEditor & HistoryEditor>(id?: string | null | undefined) => T | undefined;
//# sourceMappingURL=useStoreEditorRef.d.ts.map