import { PlatePlugin, SPEditor } from '@udecode/plate-core';
import { DeserializeHTMLChildren } from '../types';
export interface DeserializeMarksProps<T extends SPEditor = SPEditor> {
    plugins: PlatePlugin<T>[];
    element: HTMLElement;
    children: DeserializeHTMLChildren[];
}
/**
 * Deserialize HTML to TDescendant[] with marks on Text.
 * Build the leaf from the leaf deserializers of each plugin.
 */
export declare const deserializeHTMLToMarks: <T extends SPEditor = SPEditor>(editor: T, { plugins, element, children }: DeserializeMarksProps<T>) => any[];
//# sourceMappingURL=deserializeHTMLToMarks.d.ts.map