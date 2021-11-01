import React from 'react';
import { useEventEditorId, useStoreEditorRef } from '@udecode/plate-core';
import { insertImage } from '@udecode/plate-image';
import { ToolbarButtonProps } from '@udecode/plate-toolbar';

export interface ToolbarImageProps extends ToolbarButtonProps {
  /**
   * Default onMouseDown is getting the image url by calling this promise before inserting the image.
   */
  getImageUrl?: () => Promise<string>;
}

export const ToolbarImage = ({
  uploadedImgUrl,
  ...props
}: ToolbarImageProps) => {
  const editor = useStoreEditorRef(useEventEditorId('focus'));
  const handleUploadImage = async (e: any) => {
    const formData = new FormData();
    formData.append('File', e.currentTarget.files[0]);
    const res = await fetch('/api/file/uploadFile', {
      method: 'POST',
      body: formData,
    });
    const resJson = await res.json();
    return `https://blur-image.sfo3.digitaloceanspaces.com/${resJson.image}`;
  };

  let url;
  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          if (!editor) return;
          e.preventDefault();
          url = await handleUploadImage(e);
          if (!url) return;
          insertImage(editor, url);
        }}
        {...props}
      />
    </>
  );
};
