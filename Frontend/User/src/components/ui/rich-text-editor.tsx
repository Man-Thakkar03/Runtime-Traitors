"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from './button';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Quote,
  Code,
  Undo,
  Redo
} from 'lucide-react';
import { useState } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ content, onChange, placeholder, className }: RichTextEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-400 underline',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start writing...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageInput(false);
    }
  };

  const removeLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
  };

  const toggleLink = () => {
    if (editor.isActive('link')) {
      removeLink();
    } else {
      setShowLinkInput(true);
    }
  };

  const toggleImage = () => {
    setShowImageInput(!showImageInput);
  };

  return (
    <div className={`border border-[#2D2D35] rounded-lg bg-[#1A1A1F] ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-[#2D2D35]">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'}`}
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'}`}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-[#2D2D35] mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'}`}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'}`}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('blockquote') ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'}`}
        >
          <Quote className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('codeBlock') ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'}`}
        >
          <Code className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-[#2D2D35] mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleLink}
          className={`h-8 w-8 p-0 ${editor.isActive('link') ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'}`}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleImage}
          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-[#2D2D35] mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="h-8 w-8 p-0 text-gray-400 hover:text-white disabled:opacity-50"
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="h-8 w-8 p-0 text-gray-400 hover:text-white disabled:opacity-50"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Link Input */}
      {showLinkInput && (
        <div className="p-2 border-b border-[#2D2D35] bg-[#23232A]">
          <div className="flex items-center gap-2">
            <input
              type="url"
              placeholder="Enter URL..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addLink();
                } else if (e.key === 'Escape') {
                  setShowLinkInput(false);
                  setLinkUrl('');
                }
              }}
              className="flex-1 px-3 py-1.5 bg-[#1A1A1F] border border-[#2D2D35] rounded text-white text-sm focus:ring-purple-500 focus:border-purple-500"
            />
            <Button
              type="button"
              size="sm"
              onClick={addLink}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Add
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setShowLinkInput(false);
                setLinkUrl('');
              }}
              className="border-[#2D2D35] text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Image Input */}
      {showImageInput && (
        <div className="p-2 border-b border-[#2D2D35] bg-[#23232A]">
          <div className="flex items-center gap-2">
            <input
              type="url"
              placeholder="Enter image URL..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addImage();
                } else if (e.key === 'Escape') {
                  setShowImageInput(false);
                  setImageUrl('');
                }
              }}
              className="flex-1 px-3 py-1.5 bg-[#1A1A1F] border border-[#2D2D35] rounded text-white text-sm focus:ring-purple-500 focus:border-purple-500"
            />
            <Button
              type="button"
              size="sm"
              onClick={addImage}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Add
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setShowImageInput(false);
                setImageUrl('');
              }}
              className="border-[#2D2D35] text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="p-4">
        <EditorContent 
          editor={editor} 
          className="prose prose-invert max-w-none focus:outline-none"
        />
      </div>
    </div>
  );
} 