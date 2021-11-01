import { PlatePlugin, SPEditor, WithOverride } from '@udecode/plate-core';
import { ReactEditor } from 'slate-react';
export interface WithDeserializeHTMLOptions<T extends SPEditor = SPEditor & ReactEditor> {
    plugins?: PlatePlugin<T>[];
}
export declare const htmlDeserializerId = "HTML Deserializer";
/**
 * Enables support for deserializing inserted content from HTML format to Slate format.
 */
export declare const withDeserializeHTML: <T extends ReactEditor & SPEditor = ReactEditor & SPEditor>({ plugins }?: WithDeserializeHTMLOptions<T>) => WithOverride<T, {}>;
/**
 * @see {@link withDeserializeHTML}
 */
export declare const createDeserializeHTMLPlugin: (options_0?: WithDeserializeHTMLOptions<ReactEditor & SPEditor> | undefined) => PlatePlugin<SPEditor>;
//# sourceMappingURL=createDeserializeHTMLPlugin.d.ts.map