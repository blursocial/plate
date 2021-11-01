import { PlatePlugin, SPEditor, WithOverride } from '@udecode/plate-core';
import { ReactEditor } from 'slate-react';
export interface WithDeserializeCSVOptions<T extends SPEditor = SPEditor & ReactEditor> {
    plugins?: PlatePlugin<T>[];
    errorTolerance?: number;
}
export declare const csvDeserializerId = "CSV Deserializer";
/**
 * Enables support for deserializing content
 * from CSV format to Slate format.
 */
export declare const withDeserializeCSV: <T extends ReactEditor & SPEditor = ReactEditor & SPEditor>({ plugins, errorTolerance, }?: WithDeserializeCSVOptions<T>) => WithOverride<T, {}>;
/**
 * @see {@link withDeserializeCSV}
 */
export declare const createDeserializeCSVPlugin: (options_0?: WithDeserializeCSVOptions<ReactEditor & SPEditor> | undefined) => PlatePlugin<SPEditor>;
//# sourceMappingURL=createDeserializeCSVPlugin.d.ts.map