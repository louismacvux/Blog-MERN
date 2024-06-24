import "../../styling/notes.css";
import {Container, Row} from 'reactstrap';

export default function NoteItem(props){
    return (
      <Container
        className={`note-item  ${props.isSelected ? 'selected' : ''}`}
        onClick={() => props.selectNote(props.note._id)}
      >
        <Row>
          <div className="note-title">
            <strong>{props.note.title}</strong>
          </div>
        </Row>
        <Row>
          <div className="note-date">
            {props.note.update_time ? (
              <small>{props.note.update_time}</small>
            ) : (
              <small>{props.note.time}</small>
            )}
          </div>
        </Row>
      </Container>
    );
}