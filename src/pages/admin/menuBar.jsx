import { EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import { Image, Link } from "lucide-react";

export default function MenuBar({ editor, addImage }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isBold: editor.isActive("bold") ?? false,
        canBold: editor.can().chain().toggleBold().run() ?? false,
        isItalic: editor.isActive("italic") ?? false,
        canItalic: editor.can().chain().toggleItalic().run() ?? false,
        isStrike: editor.isActive("strike") ?? false,
        canStrike: editor.can().chain().toggleStrike().run() ?? false,
        canClearMarks: editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: editor.isActive("paragraph") ?? false,
        isHeading1: editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: editor.isActive("heading", { level: 3 }) ?? false,
        isCodeBlock: editor.isActive("codeBlock") ?? false,
        isCode: editor.isActive("code") ?? false,
        canCode: editor.can().chain().toggleCode().run() ?? false,
        isBlockquote: editor.isActive("blockquote") ?? false,
        isLink: editor.isActive("link") ?? false,
      };
    },
  });

  return (
    <div className="">
      <div className=" flex items-center overflow-x-scroll sm:overflow-x-hidden gap-2 sm:p-3 rounded-md   border-gray-100 bg-gray-500 whitespace-nowrap px-2 py-2 sticky top-0 rounded-t-md">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={
            editorState.isBold
              ? "bg-green-600 text-white px-2  h-10 flex items-center justify-center rounded-md"
              : " border bg-gray-200 border-gray-300 px-2  h-10 flex items-center justify-center rounded-md text-sm text-gray-700 "
          }
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={
            editorState.isItalic
              ? "bg-green-600 text-white px-2 h-10 flex items-center justify-center rounded-md"
              : " border bg-gray-200 border-gray-300 px-2  h-10 flex items-center justify-center rounded-md text-sm text-gray-700 "
          }
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editorState.isParagraph
              ? "bg-green-600 text-white px-2  h-10 flex items-center justify-center rounded-md"
              : " border bg-gray-200 border-gray-300 px-2  h-10 flex items-center justify-center rounded-md text-sm text-gray-700 "
          }
        >
          Paragraphe
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editorState.isHeading1
              ? "bg-green-600 text-white px-2 h-10 flex items-center justify-center rounded-md"
              : " border bg-gray-200 border-gray-300 px-2  h-10 flex items-center justify-center rounded-md text-sm text-gray-700 "
          }
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editorState.isHeading2
              ? "bg-green-600 text-white px-2  h-10 flex items-center justify-center rounded-md"
              : " border bg-gray-200 border-gray-300 px-2  h-10 flex items-center justify-center rounded-md text-sm text-gray-700 "
          }
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editorState.isHeading3
              ? "bg-green-600 text-white px-2  h-10 flex items-center justify-center rounded-md"
              : " border bg-gray-200 border-gray-300 px-2 min-w-10 h-10 flex items-center justify-center rounded-md text-sm text-gray-700 "
          }
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editorState.isCodeBlock
              ? "bg-green-600 text-white px-2  h-10 flex items-center justify-center rounded-md"
              : " border bg-gray-200 border-gray-300 px-2  h-10 flex items-center justify-center rounded-md text-sm text-gray-700 "
          }
        >
          Code block
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={
            editorState.isCode
              ? "bg-green-600 text-white px-2  h-10 flex items-center justify-center rounded-md"
              : " border bg-gray-200 border-gray-300 px-2  h-10 flex items-center justify-center rounded-md text-sm text-gray-700 "
          }
        >
          Code
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editorState.isBlockquote
              ? "bg-green-600 text-white px-2  h-10 flex items-center justify-center rounded-md"
              : " border bg-gray-200 border-gray-300 px-2  h-10 flex items-center justify-center rounded-md text-sm text-gray-700 "
          }
        >
          Blockquote
        </button>
        <Link
          onClick={() => {
            const url = prompt("Entrez l’URL du lien");
            if (!url) return;

            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({
                href: url,
              })
              .run();
          }}
          className={
            editor.isActive("link")
              ? "bg-green-600 text-white px-2 h-10 flex items-center justify-center rounded-md"
              : " border bg-gray-200 border-gray-300 px-2 min-w-10 h-10 flex items-center justify-center rounded-md text-sm text-gray-700 "
          }
        />
        <Image
          onClick={addImage}
          className={
            editor.isActive("image")
              ? "bg-green-600 text-white px-2 min-w-10 h-10 flex items-center justify-center rounded-md"
              : " border bg-gray-200 border-gray-300 px-2 min-w-10 h-10 flex items-center justify-center rounded-md text-sm text-gray-700 "
          }
        />
      </div>
    </div>
  );
}
