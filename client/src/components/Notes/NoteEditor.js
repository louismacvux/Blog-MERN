import React, {useState, useMemo} from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "../../styling/notes.css";

export default function NoteEditor(props) {
    const [value, setValue] = useState("");

    const onChange = (value) => {
      setValue(value);
      props.note.content = value;
    };

    const newOptions = useMemo(() => {
      return {
        showIcons: ["table", "code"],
        sideBySideFullscreen: false,
        maxHeight: "55vh"
      };
    }, []);

    if (!props.note) {
        return <div className="note-editor no-note">Select a note to edit</div>;
    }

    return (
      <div className="note-editor">
        <h4 className="d-inline-block">{props.note.title}</h4>
        <SimpleMDE
          id="editor"
          value={props.note.content}
          onChange={onChange}
          options={newOptions}
        />
      </div>
    );
}