import { useState, useEffect, useReducer } from "react";
import BackBtn from "../components/backBtn";
import "../style.css";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_Task":
      return [...state, { text: action.payload, complete: false }];

    case "DELETE_TASK":
      return state.filter((_, index) => index !== action.payload);

    case "COMPLETE_TASK":
      return state.map((task, index) =>
        index === action.payload ? { ...task, complete: !task.complete } : task
      );

    default:
      return state;
  }
}

export default function TodoPage() {
  const initialState = localStorage.getItem("ToDoStore");

  const [list, dispatch] = useReducer(
    reducer,
    initialState ? JSON.parse(initialState) : []
  );

  const [task, setTask] = useState("");

  useEffect(() => {
    localStorage.setItem("ToDoStore", JSON.stringify(list));
  }, [list]);

  function taskChange(e) {
    setTask(e.target.value);
  }

  function addTask() {
    if (task !== "") {
      dispatch({ type: "ADD_Task", payload: task });
      setTask("");
    }
  }

  function deleteTask(index) {
    dispatch({ type: "DELETE_TASK", payload: index });
  }

  function compliteTask(index) {
    dispatch({ type: "COMPLETE_TASK", payload: index });
  }

  return (
    <div>
      <div className="cont">
        <BackBtn />
        <input type="text" value={task} onChange={taskChange} />
        <button className="add" onClick={addTask}>
          Add
        </button>
      </div>

      <ul>
        {list.map((item, index) => (
          <div key={index} className="task-container">
            <div>
              <li
                className="task"
                style={item.complete ? { textDecoration: "line-through" } : {}}
              >
                <span>{index + 1} - </span> {item.text}
              </li>
            </div>
            <div className="btn-container">
              <button className="del" onClick={() => deleteTask(index)}>
                Delete
              </button>
              <button className="del" onClick={() => compliteTask(index)}>
                {item.complete ? "Undo" : "Done"}
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
