/// <reference types="react" />
import { ToolbarButtonProps } from '@udecode/plate-toolbar';
export interface ToolbarMediaEmbedProps extends ToolbarButtonProps {
    /**
     * Default onMouseDown is getting the embed url by calling this promise before inserting the embed.
     */
    getEmbedUrl?: () => Promise<string>;
}
export declare const ToolbarMediaEmbed: ({ getEmbedUrl, ...props }: ToolbarMediaEmbedProps) => JSX.Element;
//# sourceMappingURL=ToolbarMediaEmbed.d.ts.map