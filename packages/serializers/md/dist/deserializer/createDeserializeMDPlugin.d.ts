import { PlatePlugin, SPEditor, WithOverride } from '@udecode/plate-core';
import { ReactEditor } from 'slate-react';
export interface WithDeserializeMarkdownOptions<T extends SPEditor = SPEditor & ReactEditor> {
    plugins?: PlatePlugin<T>[];
}
export declare const mdDeserializerId = "MD Deserializer";
/**
 * Enables support for deserializing content
 * from Markdown format to Slate format.
 */
export declare const withDeserializeMD: <T extends ReactEditor & SPEditor = ReactEditor & SPEditor>({ plugins, }?: WithDeserializeMarkdownOptions<T>) => WithOverride<T, {}>;
/**
 * @see {@link withDeserializeMd}
 */
export declare const createDeserializeMDPlugin: (options_0?: WithDeserializeMarkdownOptions<ReactEditor & SPEditor> | undefined) => PlatePlugin<SPEditor>;
//# sourceMappingURL=createDeserializeMDPlugin.d.ts.map