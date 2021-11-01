import { SPEditor, WithOverride } from '@udecode/plate-core';
import { IndentPluginOptions } from './types';
/**
 * - `node.indent` can not exceed `indentMax`
 * - `node.indent` is unset if `node.type` is not in `types`
 */
export declare const withIndent: (options?: IndentPluginOptions | undefined) => WithOverride<SPEditor>;
//# sourceMappingURL=withIndent.d.ts.map