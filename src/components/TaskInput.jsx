import React from "react";
import "./TaskInput.css";

function TaskInput({ newTask, handleChange, addTask }) {
  return (
    <>
      <h1 className="task-heading">MY TASKS FOR THE DAY </h1>
      <div className="task-input-container">
        <input
          type="text"
          placeholder="Enter your new task here"
          value={newTask}
          onChange={handleChange}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </>
  );
}

export default TaskInput;
