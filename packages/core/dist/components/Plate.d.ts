import React from 'react';
import { EditableProps } from 'slate-react/dist/components/editable';
import { SPEditor } from '../types/SPEditor';
import { UsePlateEffectsOptions } from '../types/UsePlateEffectsOptions';
import { UseSlatePropsOptions } from '../types/UseSlatePropsOptions';
export interface PlateProps<T extends SPEditor = SPEditor> extends UsePlateEffectsOptions<T>, UseSlatePropsOptions {
    /**
     * The children rendered inside `Slate` before the `Editable` component.
     */
    children?: React.ReactNode;
    /**
     * The props for the `Editable` component.
     */
    editableProps?: EditableProps;
    /**
     * Custom `Editable` node.
     */
    renderEditable?: (editable: React.ReactNode) => React.ReactNode;
}
export declare const Plate: <T extends SPEditor = SPEditor>({ children, renderEditable, ...options }: PlateProps<T>) => JSX.Element | null;
//# sourceMappingURL=Plate.d.ts.map