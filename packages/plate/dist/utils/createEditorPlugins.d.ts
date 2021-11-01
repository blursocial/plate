import { PlatePlugin, PlatePluginComponent, PlatePluginOptions, SPEditor, TEditor } from '@udecode/plate-core';
import { ReactEditor } from 'slate-react';
import { DefaultPlatePluginKey } from './createPlateOptions';
/**
 * Quick helper to create an editor with plugins.
 * - createEditor
 * - withPlate
 * - createReactPlugin
 * - createHistoryPlugin
 * - options
 * - components
 */
export declare const createEditorPlugins: <E extends SPEditor & ReactEditor = SPEditor & ReactEditor, T extends string = string>({ editor, plugins, options, components, }?: {
    editor?: TEditor<import("@udecode/plate-core").AnyObject> | undefined;
    plugins?: PlatePlugin<E>[] | undefined;
    options?: Partial<Record<DefaultPlatePluginKey | T, Partial<PlatePluginOptions<import("@udecode/plate-core").AnyObject>>>> | undefined;
    components?: Partial<Record<DefaultPlatePluginKey | T, PlatePluginComponent>> | undefined;
}) => import("slate").BaseEditor & import("@udecode/plate-core").AnyObject & {
    children: any[];
} & E;
//# sourceMappingURL=createEditorPlugins.d.ts.map