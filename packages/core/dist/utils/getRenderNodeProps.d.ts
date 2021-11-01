import { RenderNodeOptions } from '../types/PlatePluginOptions/RenderNodeOptions';
import { SPRenderNodeProps } from '../types/SPRenderNodeProps';
/**
 * Computes `className` and `nodeProps`
 */
export declare const getRenderNodeProps: ({ attributes, overrideProps, type, getNodeProps, props, }: Omit<RenderNodeOptions, "component"> & {
    props: SPRenderNodeProps;
    attributes?: any;
}) => {
    className: string;
    nodeProps: any;
};
//# sourceMappingURL=getRenderNodeProps.d.ts.map