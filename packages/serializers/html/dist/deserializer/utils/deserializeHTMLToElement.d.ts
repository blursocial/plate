import { PlatePlugin, SPEditor, TElement } from '@udecode/plate-core';
import { DeserializeHTMLChildren } from '../types';
/**
 * Deserialize HTML to Element.
 */
export declare const deserializeHTMLToElement: <T extends SPEditor = SPEditor>(editor: T, { plugins, element, children, }: {
    plugins: PlatePlugin<T>[];
    element: HTMLElement;
    children: DeserializeHTMLChildren[];
}) => TElement | undefined;
//# sourceMappingURL=deserializeHTMLToElement.d.ts.map