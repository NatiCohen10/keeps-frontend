import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import api from "@/lib/api";
import { useAuth } from "../context/authContext";

function TasksList() {
  const { loggedInUser } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTasks();
  }, []);

  function togglePin(ev, taskId) {
    ev.stopPropagation();
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, isPinned: !task.isPinned } : task
      )
    );
  }
  const pinnedTasks = tasks.filter((task) => task.isPinned);
  const unpinnedTasks = tasks.filter((task) => !task.isPinned);

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-5 lg:text-5xl lg:mb-7">
        Hello, {loggedInUser.firstName}
      </h1>
      <div>
        <h2 className="text-2xl font-semibold mb-3">Pinned Tasks</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pinnedTasks.map((task) => (
            <TaskItem key={task._id} onTogglePin={togglePin} task={task} />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Unpinned Tasks</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {unpinnedTasks.map((task) => (
            <TaskItem key={task._id} onTogglePin={togglePin} task={task} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TasksList;
