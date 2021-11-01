import { PlatePlugin, SPEditor, TDescendant } from '@udecode/plate-core';
/**
 * Deserialize HTML element to a valid document fragment.
 */
export declare const deserializeHTMLToDocumentFragment: <T extends SPEditor = SPEditor>(editor: T, { plugins, element, stripWhitespace, }: {
    plugins: PlatePlugin<T>[];
    element: HTMLElement | string;
    stripWhitespace?: boolean | undefined;
}) => TDescendant[];
//# sourceMappingURL=deserializeHTMLToDocumentFragment.d.ts.map