import { SPEditor } from '../../types/SPEditor';
import { UsePlateOptions } from '../../types/UsePlateOptions';
/**
 * Run `usePlateEffects` and props getter for `Slate` and `Editable` components.
 * Use `usePlateStore` to select store state.
 */
export declare const usePlate: <T extends SPEditor = SPEditor>({ id, components, editor, initialValue, value, options, plugins, onChange, editableProps, normalizeInitialValue, }: UsePlateOptions<T>) => {
    slateProps: Omit<import("../..").SlateProps, "children">;
    editableProps: import("slate-react/dist/components/editable").EditableProps;
};
//# sourceMappingURL=usePlate.d.ts.map