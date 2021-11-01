import { QueryNodeOptions } from '@udecode/plate-common';
import { SPEditor, WithOverride } from '@udecode/plate-core';
export interface TrailingBlockPluginOptions extends QueryNodeOptions {
    /**
     * Type of the trailing block
     */
    type?: string;
    /**
     * Level where the trailing node should be, the first level being 0.
     */
    level?: number;
}
/**
 * Add a trailing block when the last node type is not `type` and when the editor has .
 */
export declare const withTrailingBlock: ({ type: _type, level, ...query }?: TrailingBlockPluginOptions) => WithOverride;
/**
 * @see {@link withTrailingNode}
 */
export declare const createTrailingBlockPlugin: (options_0?: TrailingBlockPluginOptions | undefined) => import("@udecode/plate-core").PlatePlugin<SPEditor>;
//# sourceMappingURL=createTrailingBlockPlugin.d.ts.map