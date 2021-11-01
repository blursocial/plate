import { HTMLAttributes } from 'react';
import { SPRenderElementProps } from '@udecode/plate-core';
import { Element } from 'slate';
import { StyledProps } from '../types/StyledProps';
export declare type StyledElementProps<TElement = Element, TStyles = {}> = SPRenderElementProps<TElement> & StyledProps<TStyles> & HTMLAttributes<HTMLElement>;
//# sourceMappingURL=StyledElement.types.d.ts.map