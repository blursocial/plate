import { PlatePlugin, SPEditor } from '@udecode/plate-core';
import { DeserializeHTMLReturn } from '../types';
/**
 * Deserialize HTML element or child node.
 */
export declare const deserializeHTMLNode: <T extends SPEditor = SPEditor>(editor: T, plugins: PlatePlugin<T>[]) => (node: HTMLElement | ChildNode) => DeserializeHTMLReturn;
//# sourceMappingURL=deserializeHTMLNode.d.ts.map