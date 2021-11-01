import { WithOverride } from '@udecode/plate-core';
import { WithAutoformatOptions } from './types';
/**
 * Enables support for autoformatting actions.
 * Once a match rule is validated, it does not check the following rules.
 */
export declare const withAutoformat: ({ rules, }: WithAutoformatOptions) => WithOverride;
/**
 * @see {@link withAutoformat}
 */
export declare const createAutoformatPlugin: (options_0: WithAutoformatOptions) => import("@udecode/plate-core").PlatePlugin<import("@udecode/plate-core").SPEditor>;
//# sourceMappingURL=createAutoformatPlugin.d.ts.map