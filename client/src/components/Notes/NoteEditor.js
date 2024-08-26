import React, {useState, useMemo} from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "../../styling/notes.css";

export default function NoteEditor({note, saveNote, deleteNote}) {
    const [value, setValue] = useState("");

    const onChange = (value) => {
      setValue(value);
      note.content = value;
      note.time = 0;
    };

    const newOptions = useMemo(() => {
      return {
        showIcons: ["table", "code"],
        sideBySideFullscreen: false,
        maxHeight: "450px",
        toolbar: [
          "bold",
          "italic",
          "heading",
          "|",
          "quote",
          "unordered-list",
          "ordered-list",
          "|",
          "link",
          "image",
          "table",
          "|",
          "preview",
          "side-by-side",
          "fullscreen",
          "|",
          {
            name: "custom",
            action: function customFunction(editor){
              saveNote();
            },
            className: "fa fa-save",
            title: "Save",
          },
          {
            name: "custom",
            action: function customFunction(editor){
                deleteNote(true);
			      },
            className: "fa fa-trash",
            title: "Delete",
          },
          "|",
          "guide",
        ],
      };
    },[saveNote,deleteNote]);

    if (!note) {
        return <div className="no-note">Select a note to edit</div>;
    }


    return (
      <div className="mde">
        <SimpleMDE
          id="editor"
          value={note.content}
          onChange={onChange}
          options={newOptions}
        />
      </div>
    );
}

