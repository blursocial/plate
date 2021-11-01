/// <reference types="react" />
import { SPEditor, SPRenderLeafProps, SPRenderNodeProps } from '@udecode/plate-core';
import { GetElementOverridePropsParams } from '../types';
export declare const getElementOverrideProps: (editor: SPEditor, { type, types, options, defaultOption, classNames, }: GetElementOverridePropsParams) => ({ element, style, className, }: SPRenderLeafProps | SPRenderNodeProps) => {
    className?: string | undefined;
    styles?: import("react").CSSProperties | undefined;
};
//# sourceMappingURL=getElementOverrideProps.d.ts.map