import React from "react";
import "./TaskInput.css";

function TaskInput({ newTask, handleChange, addTask }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
      event.preventDefault();
    }
  };
  return (
    <>
      <h1 className="task-heading">MY TASKS FOR THE DAY </h1>
      <div className="task-input-container">
        <input
          type="text"
          placeholder="Enter your new task here"
          value={newTask}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <button onClick={addTask} aria-label="Add new task">
          Add Task
        </button>
      </div>
    </>
  );
}

export default TaskInput;
