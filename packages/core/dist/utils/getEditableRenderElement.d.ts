/// <reference types="react" />
import { PlatePluginOptions } from '../types/PlatePluginOptions/PlateOptions';
import { SPRenderElementProps } from '../types/SPRenderElementProps';
/**
 * Get a `Editable.renderElement` handler for `options.type`.
 * If the type is equals to the slate element type, render `options.component`.
 * Else, return `undefined` so the pipeline can check the next plugin.
 */
export declare const getEditableRenderElement: (options: PlatePluginOptions[]) => (props: SPRenderElementProps) => JSX.Element | undefined;
//# sourceMappingURL=getEditableRenderElement.d.ts.map