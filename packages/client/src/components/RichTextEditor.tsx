import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import type { ReactNode } from 'react';

/* =====================================================
   ✅ Toolbar Button
===================================================== */
type BtnProps = {
  onClick: () => void;
  active?: boolean;
  children: ReactNode;
};

function ToolbarButton({ onClick, active, children }: BtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-1 border rounded text-sm transition
        ${active ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'}`}
    >
      {children}
    </button>
  );
}

/* =====================================================
   Editor Component
===================================================== */
interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {}, // TS-safe
        orderedList: {},
        listItem: {},
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Typography,
      TextStyle,
      Color,
      Highlight,
      Image,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Write case content...',
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      {/* ================= TOOLBAR ================= */}
      <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-gray-50">
        {/* Text Formatting */}
        <ToolbarButton
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <b>B</b>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <i>I</i>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <u>U</u>
        </ToolbarButton>

        {/* Lists */}
        <ToolbarButton
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </ToolbarButton>

        {/* Headings */}
        <ToolbarButton
          active={editor.isActive('heading', { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </ToolbarButton>

        {/* Alignment */}
        <ToolbarButton
          active={editor.isActive({ textAlign: 'left' })}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          ⬅
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'center' })}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          ⬌
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'right' })}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          ➡
        </ToolbarButton>

        {/* Undo/Redo */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </ToolbarButton>

        {/* Link */}
        <ToolbarButton
          onClick={() => {
            const url = prompt('Enter link URL');
            if (url)
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url })
                .run();
          }}
        >
          Link
        </ToolbarButton>

        {/* Image */}
        <ToolbarButton
          onClick={() => {
            const url = prompt('Image URL');
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        >
          Image
        </ToolbarButton>
      </div>

      {/* ================= EDITOR ================= */}
      <div className="ProseMirror min-h-[220px] border rounded-md p-3 bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
