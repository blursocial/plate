import { QueryNodeOptions } from '@udecode/plate-common';
import { WithOverride } from '@udecode/plate-core';
export declare type SelectOnBackspacePluginOptions = QueryNodeOptions;
export declare type WithSelectOnBackspaceOptions = SelectOnBackspacePluginOptions;
/**
 * Set a list of element types to select on backspace
 */
export declare const withSelectOnBackspace: (query: WithSelectOnBackspaceOptions) => WithOverride;
/**
 * @see {@link withSelectOnBackspace}
 */
export declare const createSelectOnBackspacePlugin: (query: QueryNodeOptions) => import("@udecode/plate-core").PlatePlugin<import("@udecode/plate-core").SPEditor>;
//# sourceMappingURL=createSelectOnBackspacePlugin.d.ts.map