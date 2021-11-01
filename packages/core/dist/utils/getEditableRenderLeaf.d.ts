import { RenderNodeOptions } from '../types/PlatePluginOptions/RenderNodeOptions';
import { SPRenderLeafProps } from '../types/SPRenderLeafProps';
/**
 * Get a `Editable.renderLeaf` handler for `options.type`.
 * If the type is equals to the slate leaf type and if the text is not empty, render `options.component`.
 * Else, return `children`.
 */
export declare const getEditableRenderLeaf: ({ type, component: Leaf, getNodeProps, overrideProps, }: RenderNodeOptions) => (props: SPRenderLeafProps) => any;
//# sourceMappingURL=getEditableRenderLeaf.d.ts.map