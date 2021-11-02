/// <reference types="react" />
import { ToolbarButtonProps } from '@udecode/plate-toolbar';
export interface ToolbarImageProps extends ToolbarButtonProps {
    /**
     * Default onMouseDown is getting the image url by calling this promise before inserting the image.
     */
    getImageUrl?: (e: any) => Promise<string>;
}
export declare const ToolbarImage: ({ getImageUrl, ...props }: ToolbarImageProps) => JSX.Element;
//# sourceMappingURL=ToolbarImage.d.ts.map