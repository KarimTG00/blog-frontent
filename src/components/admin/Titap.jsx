// src/Tiptap.jsx

import MenuBar from "../../pages/admin/menuBar";
import { EditorContent } from "@tiptap/react";

import { useContext, useEffect } from "react";
import { AppContext } from "../context";

const Tiptap = () => {
  const { editor } = useContext(AppContext);

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) return null;

  useEffect(() => {
    if (!editor) return;

    const observer = new ResizeObserver(() => {
      editor.view.dispatch(editor.state.tr);
    });

    observer.observe(editor.view.dom);

    return () => observer.disconnect();
  }, [editor]);

  return (
    <div className="">
      <MenuBar editor={editor} addImage={addImage} />
      <div className="article">
        <EditorContent editor={editor} />
      </div>

      {/* editeur de texte de tiptap */}
    </div>
  );
};

export default Tiptap;
