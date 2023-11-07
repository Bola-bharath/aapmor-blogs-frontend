import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
    ],
    // handlers: {
    //   image: insertImage, // Define a custom handler for the 'image' button
    // },
  },
};

function MyEditor() {
  const [value, setValue] = useState("");
  const [editorHtml, setEditorHtml] = useState("");
  console.log(editorHtml);

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  return (
    <div style={{ width: "50%" }}>
      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
      />
    </div>
  );
}
export default MyEditor;
