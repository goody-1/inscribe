import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';



const TextEditor = ({ value, onChange }) => {

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  };
  const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'link', 'image', 'video'
  ];

  return (
    <div>
      <ReactQuill
        className="h-[10rem] mb-12 text-gray-800 font-mono mt-3 rounded-lg"
        theme='snow'
        value={value}
        onChange={onChange}
        formats={formats}
        placeholder="Inscribe your wonderful inspirations..."
        modules={modules}
      />
    </div>
  );
};

export default TextEditor;