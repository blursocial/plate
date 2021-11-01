import { PlatePlugin, SPEditor } from '@udecode/plate-core';
import { DeserializeHTMLReturn } from '../types';
/**
 * Deserialize HTML element.
 */
export declare const deserializeHTMLElement: <T extends SPEditor = SPEditor>(editor: T, { plugins, element, }: {
    plugins: PlatePlugin<T>[];
    element: HTMLElement;
}) => DeserializeHTMLReturn;
//# sourceMappingURL=deserializeHTMLElement.d.ts.map