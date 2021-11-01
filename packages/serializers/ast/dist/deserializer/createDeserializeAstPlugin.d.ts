import { PlatePlugin, SPEditor, WithOverride } from '@udecode/plate-core';
import { ReactEditor } from 'slate-react';
export interface WithDeserializeAstOptions<T extends SPEditor = SPEditor & ReactEditor> {
    plugins?: PlatePlugin<T>[];
}
export declare const astDeserializerId = "AST Deserializer";
/**
 * Enables support for deserializing inserted content from Slate Ast format to Slate format
 * while apply a small bug fix.
 */
export declare const withDeserializeAst: <T extends ReactEditor & SPEditor = ReactEditor & SPEditor>({ plugins }?: WithDeserializeAstOptions<T>) => WithOverride<T, {}>;
/**
 * @see {@link withDeserializeAst}
 */
export declare const createDeserializeAstPlugin: (options_0?: WithDeserializeAstOptions<ReactEditor & SPEditor> | undefined) => PlatePlugin<SPEditor>;
//# sourceMappingURL=createDeserializeAstPlugin.d.ts.map