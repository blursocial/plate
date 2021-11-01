import { SPEditor } from '@udecode/plate-core';
import { NodeEntry } from 'slate';
import { ListNormalizerOptions } from '../types';
/**
 * Normalize list node to force the ul>li>p+ul structure.
 */
export declare const getListNormalizer: (editor: SPEditor, { validLiChildrenTypes }: ListNormalizerOptions) => ([node, path]: NodeEntry<import("slate").Node>) => void;
//# sourceMappingURL=getListNormalizer.d.ts.map