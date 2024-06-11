'use client';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { BlockNoteView } from '@blocknote/mantine';
import { useUploadFile } from '../../hooks';
import { Block, BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { POST_CONTENT_LOCAL_STORAGE_KEY } from '../../common/constants/general';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isJSON } from '../../utils/isJSON';

type BlockNoteProps = {
  className?: string;
  content?: string;
  setContent?: React.Dispatch<React.SetStateAction<string>>;
};

export default function BlockNote({
  className,
  content,
  setContent,
}: BlockNoteProps) {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');

  const uploadFile = useUploadFile();

  const editor = useMemo(() => {
    if (initialContent === 'loading') {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent, uploadFile: uploadFile });
  }, [initialContent]);

  const saveToLocalStorage = useCallback((jsonBlocks: Block[]) => {
    localStorage.setItem(
      POST_CONTENT_LOCAL_STORAGE_KEY,
      JSON.stringify(jsonBlocks)
    );
  }, []);

  const loadFromStorage = useCallback(async () => {
    const storageString = localStorage.getItem(POST_CONTENT_LOCAL_STORAGE_KEY);
    return storageString
      ? (JSON.parse(storageString) as PartialBlock[])
      : undefined;
  }, []);

  useEffect(() => {
    if (content) {
      setInitialContent(isJSON(content) ? JSON.parse(content) : '');
    } else {
      loadFromStorage().then((content) => {
        setInitialContent(content);
      });
    }
  }, []);

  if (editor === undefined) {
    return 'Loading content...';
  }

  return (
    <BlockNoteView
      className={className}
      editor={editor}
      theme="light"
      onChange={() => {
        if (setContent) {
          setContent(JSON.stringify(editor.document));
        } else {
          saveToLocalStorage(editor.document);
        }
      }}
    />
  );
}
