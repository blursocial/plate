import { Location } from 'slate';
import { ReactEditor } from 'slate-react';
export interface SelectEditorOptions {
    /**
     * Specific location if edge is not defined.
     */
    at?: Location;
    /**
     * Start or end of the editor.
     */
    edge?: 'start' | 'end';
    /**
     * If true, focus the React editor before selecting.
     */
    focus?: boolean;
}
/**
 * Select an editor at a target or an edge (start, end).
 */
export declare const selectEditor: (editor: ReactEditor, { at, edge, focus }: SelectEditorOptions) => void;
//# sourceMappingURL=selectEditor.d.ts.map