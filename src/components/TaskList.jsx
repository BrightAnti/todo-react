import React, { useState } from "react";
import "./TaskList.css";
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

function TaskList({
  tasks,
  deleteTask,
  toggleEditMode,
  editTask,
  toggleCompletion,
}) {
  const [editText, setEditText] = useState("");
  const handleCancelEdit = (id) => {
    toggleEditMode(id);
    setEditText("");
  };

  const handleEditChange = (event) => {
    setEditText(event.target.value);
  };

  const handleEditSubmit = (id) => {
    if (editText.trim() !== "") {
      editTask(id, editText);
    } else {
      setEditText("");
    }
  };

  return (
    <div
      style={{
        height: 300,
        overflowY: "scroll",
        padding: 20,
        scrollBehavior: "smooth",
      }}
    >
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={task.id}
            className="task-list-item"
            style={{
              background: "#F1F1F1",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            {task.isEditing ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                  className="task-input"
                  placeholder="Edit task"
                />
                <button>
                  <ImCancelCircle
                    className="cancel-icon"
                    onClick={() => handleCancelEdit(task.id)}
                  />
                </button>
                <button onClick={() => handleEditSubmit(task.id)}>
                  <FaSave className="save-icon" />
                </button>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    // background: "green",
                    width: "100%",
                  }}
                >
                  {/* checkbox & text */}
                  <div style={{ display: "flex" }}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleCompletion(task.id)}
                    />
                    <div
                      className={`task-text ${
                        task.completed ? "completed" : ""
                      }`}
                    >
                      {task.taskName}
                    </div>
                  </div>
                  {/* action warpper */}
                  <div>
                    <button
                      className="edit-button"
                      onClick={() => {
                        toggleEditMode(task.id);
                        setEditText(task.taskName);
                      }}
                      disabled={task.completed}
                    >
                      <MdEditSquare className="edit-icon" />
                    </button>
                    <button onClick={() => deleteTask(task.id)}>
                      <MdDeleteForever className="delete-icon" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
