import { SPRenderElementProps } from '../SPRenderElementProps';
import { SPRenderLeafProps } from '../SPRenderLeafProps';
/**
 * Map slate node properties to component props.
 */
export declare type GetNodeProps = (props: SPRenderElementProps | SPRenderLeafProps) => NodeProps | undefined;
/**
 * Props passed from `getNodeProps` option.
 */
export declare type NodeProps = {
    [key: string]: any;
};
//# sourceMappingURL=GetNodeProps.d.ts.map