import { PlatePlugin } from '../types/PlatePlugin/PlatePlugin';
import { WithOverride } from '../types/PlatePlugin/WithOverride';
import { PlateOptions, PlatePluginComponent } from '../types/PlatePluginOptions/PlateOptions';
import { SPEditor } from '../types/SPEditor';
import { TEditor } from '../types/TEditor';
export interface WithPlateOptions<T extends SPEditor = SPEditor> {
    id?: string | null;
    plugins?: PlatePlugin<T>[];
    options?: PlateOptions;
    components?: Record<string, PlatePluginComponent>;
}
/**
 * Apply `withInlineVoid` and all plate plugins `withOverrides`.
 * Overrides:
 * - `id`: id of the editor.
 * - `key`: random key for the <Slate> component so each time the editor is created, the component resets.
 * - `options`: {@link PlateOptions}
 */
export declare const withPlate: <T extends SPEditor = SPEditor>({ id, plugins, options, components, }?: WithPlateOptions<T>) => WithOverride<TEditor<import("..").AnyObject>, T>;
//# sourceMappingURL=withPlate.d.ts.map