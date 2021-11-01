/// <reference types="react" />
import { SPEditor, SPRenderLeafProps, SPRenderNodeProps } from '@udecode/plate-core';
import { GetLeafOverrideProps } from '../types';
export declare const getLeafOverrideProps: (editor: SPEditor, { type, options, defaultOption, classNames }: GetLeafOverrideProps) => ({ text, style, className, }: SPRenderLeafProps | SPRenderNodeProps) => {
    className?: string | undefined;
    styles?: import("react").CSSProperties | undefined;
};
//# sourceMappingURL=getLeafOverrideProps.d.ts.map