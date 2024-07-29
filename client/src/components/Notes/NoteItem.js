import "../../styling/notes.css";
import {Container, Row} from 'reactstrap';


function stripMarkdown(md) {
  return (
    md
      // Remove headers
      .replace(/^\s{0,3}(#{1,6})\s+/gm, "")
      // Remove bold and italic
      .replace(/(\*\*|__)(.*?)\1/g, "$2")
      .replace(/(\*|_)(.*?)\1/g, "$2")
      // Remove strikethrough
      .replace(/~~(.*?)~~/g, "$1")
      // Remove inline code
      .replace(/`([^`]+)`/g, "$1")
      // Remove links
      .replace(/\[([^\]]+)]\([^\)]+\)/g, "$1")
      .replace(/<([^>]+)>/g, "$1")
      // Remove images
      .replace(/!\[([^\]]*)]\([^\)]+\)/g, "$1")
      // Remove blockquotes
      .replace(/^\s{0,3}>\s?/gm, "")
      // Remove horizontal rules
      .replace(/^-{3,}$/gm, "")
      // Remove lists
      .replace(/^\s{0,3}(\*|\+|\-|\d+\.)\s+/gm, "")
      // Remove extra spaces
      .replace(/\s+/g, " ")
      .trim()
  );
}

function truncateString(str, length = 50) {
  if (str.length <= length) {
    return str;
  }
  return str.slice(0, length) + "...";
}
function daysFrom(time) {
  const date = new Date(time);
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - date.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
}
function formatDate(time){
  var localtime = new Date(time);
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  if (daysFrom(time) == 0){
    return localtime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (daysFrom(time) < 7){
    return dayNames[localtime.getDay()];
  }else{
    return localtime.toLocaleDateString();
  }
}

export default function NoteItem(props){
    return (
      <Container
        className={`note-item  ${props.isSelected ? 'selected' : ''}`}
        onClick={() => props.selectNote(props.note._id)}
      >
        <Row>
          <div className="note-title">
            <strong>{truncateString(stripMarkdown(props.note.content))}</strong>
          </div>
        </Row>
        <Row>
          <div className="note-date">
              <small>{formatDate(props.note.time)}</small>
          </div>
        </Row>
      </Container>
    );
}