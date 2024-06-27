'use client';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import '../../styles/blocknote.css';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { isJSON } from '../../utils/isJSON';

type BlockNoteViewOnlyProps = {
  content: string;
};
export default function BlockNoteViewOnly({ content }: BlockNoteViewOnlyProps) {
  const data = content && isJSON(content) ? JSON.parse(content) : null;
  const editor = useCreateBlockNote({
    initialContent: data,
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={false}
      theme="light"
      className="p-0 pe-0 ps-0"
    />
  );
}
