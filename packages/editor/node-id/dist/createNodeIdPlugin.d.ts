import { QueryNodeOptions } from '@udecode/plate-common';
import { WithOverride } from '@udecode/plate-core';
import { HistoryEditor } from 'slate-history';
export interface WithNodeIdProps extends QueryNodeOptions {
    /**
     * Node key to store the id.
     * @default 'id'
     */
    idKey?: string;
    /**
     * ID factory, e.g. `uuid`
     * @default () => Date.now()
     */
    idCreator?: Function;
    /**
     * Filter `Text` nodes.
     * @default true
     */
    filterText?: boolean;
    /**
     * Reuse ids on undo/redo and copy/pasting if not existing in the document.
     * This is disabled by default to avoid duplicate ids across documents.
     * @default false
     */
    reuseId?: boolean;
}
/**
 * Enables support for inserting nodes with an id key.
 */
export declare const withNodeId: ({ idKey, idCreator, filterText, filter, reuseId, allow, exclude, }?: WithNodeIdProps) => WithOverride<HistoryEditor>;
/**
 * @see {@link withNodeId}
 */
export declare const createNodeIdPlugin: (options_0?: WithNodeIdProps | undefined) => import("@udecode/plate-core").PlatePlugin<import("@udecode/plate-core").SPEditor>;
//# sourceMappingURL=createNodeIdPlugin.d.ts.map