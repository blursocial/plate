import { PlatePlugin } from '../types/PlatePlugin/PlatePlugin';
import { WithOverride } from '../types/PlatePlugin/WithOverride';
import { SPEditor } from '../types/SPEditor';
export interface WithInlineVoidOptions<T extends SPEditor = SPEditor> {
    plugins?: PlatePlugin<T>[];
    inlineTypes?: string[];
    voidTypes?: string[];
}
/**
 * Merge and register all the inline types and void types from the plugins and options,
 * using `editor.isInline` and `editor.isVoid`
 */
export declare const withInlineVoid: <T extends SPEditor = SPEditor>({ plugins, inlineTypes, voidTypes, }: WithInlineVoidOptions<T>) => WithOverride<T, {}>;
/**
 * @see {@link withInlineVoid}
 */
export declare const createInlineVoidPlugin: (options_0: WithInlineVoidOptions<SPEditor>) => PlatePlugin<SPEditor>;
//# sourceMappingURL=createInlineVoidPlugin.d.ts.map