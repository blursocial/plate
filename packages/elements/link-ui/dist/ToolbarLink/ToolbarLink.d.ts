/// <reference types="react" />
import { ToolbarButtonProps } from '@udecode/plate-toolbar';
export interface ToolbarLinkProps extends ToolbarButtonProps {
    /**
     * Default onMouseDown is getting the link url by calling this promise before inserting the image.
     */
    getLinkUrl?: (prevUrl: string | null) => Promise<string | null>;
}
export declare const ToolbarLink: ({ getLinkUrl, ...props }: ToolbarLinkProps) => JSX.Element;
//# sourceMappingURL=ToolbarLink.d.ts.map