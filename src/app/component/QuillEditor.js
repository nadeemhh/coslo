'use client';

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function QuillEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    const quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Start typing...",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }]
          ],
        },
      });

    quillRef.current = quill;

    quill.on("text-change", () => {
      onChange(quill.root.innerHTML);
    });

    // Ensure value is set initially
    if (value) {
      quill.root.innerHTML = value; // Use innerHTML for raw HTML content
    }
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current;
      if (quill.root.innerHTML !== value) {
        quill.root.innerHTML = value || ""; // Update editor when value changes
      }
    }
  }, [value]);

  return <div ref={editorRef} style={{height:'500px'}} className="h-60 border border-gray-300 rounded" />;
}
