import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";
import Swal from "sweetalert2";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function App() {
  const [newTask, setNewTask] = useState("");
  const [toDolist, setToDoList] = useState(() => {
    const savedTodolist = localStorage.getItem("toDolist");
    return savedTodolist ? JSON.parse(savedTodolist) : [];
  });

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("toDolist", JSON.stringify(toDolist));
  }, [toDolist]);

  useEffect(() => {
    const resetEditMode = toDolist.map((task) => ({
      ...task,
      isEditing: false,
    }));
    setToDoList(resetEditMode);
  }, []);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const capitalizedTask = newTask.charAt(0).toUpperCase() + newTask.slice(1);
    const task = {
      id: toDolist.length === 0 ? 1 : toDolist[toDolist.length - 1].id + 1,
      taskName: capitalizedTask,
      // taskName: newTask,
      isEditing: false,
      completed: false,
    };

    const newTodolist = [...toDolist, task];
    setToDoList(newTodolist);
    setNewTask("");

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "A new task has been added successfully",
    });
  };

  const deleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTodolist = toDolist.filter((task) => task.id !== id);
        setToDoList(newTodolist);
        localStorage.setItem("task", JSON.stringify(newTodolist));

        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const editTask = (id, newTaskName) => {
    const updatedTasks = toDolist.map((task) =>
      task.id === id
        ? { ...task, taskName: newTaskName, isEditing: false }
        : task
    );
    setToDoList(updatedTasks);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Task has been edited successfully",
    });
  };

  const toggleEditMode = (id) => {
    setToDoList(
      toDolist.map((task) =>
        task.id === id
          ? { ...task, isEditing: !task.isEditing }
          : { ...task, isEditing: false }
      )
    );
  };

  const toggleCompletion = (id) => {
    setToDoList(
      toDolist.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      // Get the current order of tasks
      const oldIndex = toDolist.findIndex((task) => task.id === active.id);
      const newIndex = toDolist.findIndex((task) => task.id === over.id);

      // Move the task and update the state
      const newToDoList = arrayMove(toDolist, oldIndex, newIndex);

      // Update the state with the new order
      setToDoList(newToDoList);
    }
  };

  return (
    <div className="app-container">
      <TaskInput
        newTask={newTask}
        handleChange={handleChange}
        addTask={addTask}
      />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={toDolist.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <TaskList
            tasks={toDolist}
            deleteTask={deleteTask}
            toggleEditMode={toggleEditMode}
            editTask={editTask}
            toggleCompletion={toggleCompletion}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default App;
