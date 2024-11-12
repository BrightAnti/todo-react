import React, { useState } from "react";
import "./TaskList.css";
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import SortableItem from "./SortableItem";
import {
  DndContext,
  closestCenter,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function TaskList({
  tasks,
  deleteTask,
  toggleEditMode,
  editTask,
  toggleCompletion,
  setTasks,
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Only update if the item was dropped over a valid target
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);

      // Ensure both active and over indices are valid
      if (oldIndex !== -1 && newIndex !== -1) {
        const newTasksOrder = arrayMove(tasks, oldIndex, newIndex);
        setTasks(newTasksOrder); // Update task order
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          style={{
            height: 300,
            overflowY: "scroll",
            padding: 20,
            scrollBehavior: "smooth",
          }}
        >
          <ul className="task-list">
            {tasks.map((task) => (
              <SortableItem key={task.id} id={task.id}>
                <li
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
                          width: "100%",
                        }}
                      >
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
              </SortableItem>
            ))}
          </ul>
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default TaskList;
