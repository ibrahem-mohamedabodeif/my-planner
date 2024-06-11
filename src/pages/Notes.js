import { useState, useEffect, useReducer } from "react";
import BackBtn from "../components/backBtn";
import "../style.css";

function notesReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return [...state, { text: action.payload, complete: false }];
    case "DELETE_NOTE":
      return state.filter((_, index) => index !== action.payload);
    case "TOGGLE_NOTE_COMPLETE":
      return state.map((note, index) =>
        index === action.payload ? { ...note, complete: !note.complete } : note
      );
    case "EDIT_NOTE":
      return state.map((note, index) =>
        index === action.payload.index
          ? { ...note, text: action.payload.newText }
          : note
      );
    default:
      return state;
  }
}

export default function NotesPage() {
  const initial = localStorage.getItem("NotesStore");
  const [notes, dispatch] = useReducer(
    notesReducer,
    initial ? JSON.parse(initial) : []
  );

  const [note, setNote] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("NotesStore", JSON.stringify(notes));
  }, [notes]);

  function noteChange(e) {
    setNote(e.target.value);
  }

  function addNote() {
    if (note !== "") {
      dispatch({ type: "ADD_NOTE", payload: note });
      setNote("");
    }
  }

  function deleteNote(index) {
    dispatch({ type: "DELETE_NOTE", payload: index });
  }

  function startEditing(index, currentText) {
    setEditIndex(index);
    setEditText(currentText);
  }

  function editNoteChange(e) {
    setEditText(e.target.value);
  }

  function saveNote() {
    if (editText !== "") {
      dispatch({
        type: "EDIT_NOTE",
        payload: { index: editIndex, newText: editText },
      });
      setEditIndex(null);
      setEditText("");
    }
  }

  return (
    <div>
      <div className="cont">
        <BackBtn />
        <input type="text" value={note} onChange={noteChange} />
        <button className="add" onClick={addNote}>
          Add
        </button>
      </div>

      <ul>
        {notes.map((t, index) => (
          <div key={index} className="task-container">
            <div>
              {editIndex === index ? (
                <input type="text" value={editText} onChange={editNoteChange} />
              ) : (
                <li
                  className="task"
                  style={t.complete ? { textDecoration: "line-through" } : {}}
                >
                  <span>-</span> {t.text}
                </li>
              )}
            </div>
            <div className="btn-container">
              {editIndex === index ? (
                <button className="del" onClick={saveNote}>
                  Save
                </button>
              ) : (
                <>
                  <button className="del" onClick={() => deleteNote(index)}>
                    Delete
                  </button>
                  <button
                    className="del"
                    onClick={() => startEditing(index, t.text)}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
