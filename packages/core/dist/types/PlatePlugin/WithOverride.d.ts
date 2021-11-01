import { TEditor } from '../TEditor';
/**
 * Plate plugin overriding the `editor` methods.
 * Naming convention is `with*`.
 */
export declare type WithOverride<TEditorInput extends TEditor = TEditor, TEditorOutputExtension = {}> = <T extends TEditorInput>(editor: T) => T & TEditorOutputExtension;
//# sourceMappingURL=WithOverride.d.ts.map