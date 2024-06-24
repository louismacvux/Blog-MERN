import NoteItem from './NoteItem.js';
import "../../styling/notes.css";

export default function SideBar(props) {


    return(
        <div className="sidebar">
            {(props.notes.map((note) => (
                <NoteItem key={note._id} note={note} 
                selectNote={props.selectNote}
                isSelected={props.selectedId === note._id}></NoteItem>
            )))}
        </div>
    );
}
