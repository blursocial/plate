import { PlatePlugin, SPEditor, TDescendant } from '@udecode/plate-core';
import { ReactEditor } from 'slate-react';
export declare const insertDeserializedFragment: <T extends SPEditor = SPEditor & ReactEditor>(editor: T, { fragment, plugins, }: {
    fragment: TDescendant[];
    plugins: PlatePlugin<T>[];
}) => void;
//# sourceMappingURL=insertDeserializedFragment.d.ts.map