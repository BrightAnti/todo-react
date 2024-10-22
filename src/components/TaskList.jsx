import React, { useState } from "react";
import "./TaskList.css";

function TaskList({
  tasks,
  deleteTask,
  toggleEditMode,
  editTask,
  toggleCompletion,
}) {
  const [editText, setEditText] = useState("");

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
    <ul className="task-list">
      {tasks.map((task, index) => (
        <p key={task.id} className="task-list-item">
          {task.isEditing ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={handleEditChange}
                className="task-input"
                placeholder="Edit task"
              />
              <button
                className="joint-button"
                onClick={() => handleEditSubmit(task.id)}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task.id)}
              />
              <span className={task.completed ? "completed" : ""}>
                {task.taskName}
              </span>
              <div className="button-container">
                <button
                  className="joint-button"
                  onClick={() => {
                    toggleEditMode(task.id);
                    setEditText(task.taskName);
                  }}
                  disabled={task.completed}
                >
                  Edit
                </button>
                <button
                  className="joint-button"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </p>
      ))}
    </ul>
  );
}

export default TaskList;
