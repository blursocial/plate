import React from 'react';
import { RenderLeaf } from '@udecode/plate-core';

export const MARK_PRISM = 'prism';

export const getCodeBlockRenderLeaf = (): RenderLeaf => () => ({
  leaf,
  children,
}) => {
  if (leaf[MARK_PRISM] && !!leaf.text) {
    return <span className={leaf?.className as string}>{children}</span>;
  }
  return children;
};
