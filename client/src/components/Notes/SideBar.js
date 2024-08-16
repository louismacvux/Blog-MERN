import NoteItem from './NoteItem.js';
import "../../styling/notes.css";

export default function SideBar(props) {


    return (
      <div>
        <div className="notes-list">
          {props.notes.map((note) => (
            <NoteItem
              className="note-item"
              key={note._id}
              note={note}
              selectNote={props.selectNote}
              isSelected={props.selectedId === note._id}
            ></NoteItem>
          ))}
        </div>
      </div>
    );
}
