import { TEditor } from '@udecode/plate-core';
import { Range } from 'slate';
import { SetNodesOptions } from '../types';
export interface RemoveMarkOptions extends Omit<SetNodesOptions, 'match' | 'split'> {
    /**
     * Mark or the array of marks that will be removed
     */
    key: string | string[];
    /**
     * When location is not a Range,
     * setting this to false can prevent the onChange event of the editor to fire
     * @default true
     */
    shouldChange?: boolean;
    /**
     * Range where the mark(s) will be removed
     */
    at?: Range;
}
/**
 * Remove mark and trigger `onChange` if collapsed selection.
 */
export declare const removeMark: (editor: TEditor, { key, at, shouldChange, ...rest }: RemoveMarkOptions) => void;
//# sourceMappingURL=removeMark.d.ts.map