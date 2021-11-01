import React from 'react';
import { TEditor } from '@udecode/plate-core';
import { Path } from 'slate';
import { DraggableProps } from './Draggable.types';
export interface WithDraggableOptions extends Pick<DraggableProps, 'onRenderDragHandle' | 'styles'> {
    level?: number;
    filter?: (editor: TEditor, path: Path) => boolean;
    allowReadOnly?: boolean;
}
export declare const withDraggable: (Component: any, { styles, level, filter, allowReadOnly, onRenderDragHandle, }?: WithDraggableOptions) => React.ForwardRefExoticComponent<Pick<import("@udecode/plate-core").SPRenderNodeProps & Omit<import("slate-react").RenderElementProps, "element"> & {
    element: import("@udecode/plate-core").TElement<import("@udecode/plate-core").AnyObject>;
}, string | number> & React.RefAttributes<unknown>>;
export declare const withDraggables: (components: any, options: (Partial<WithDraggableOptions> & import("@udecode/plate-core").AnyObject & {
    key?: string | undefined;
    keys?: string[] | undefined;
}) | (Partial<WithDraggableOptions> & import("@udecode/plate-core").AnyObject & {
    key?: string | undefined;
    keys?: string[] | undefined;
})[]) => any;
//# sourceMappingURL=withDraggable.d.ts.map