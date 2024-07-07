import React, { useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import api from "@/lib/api";
import { useAuth } from "../context/authContext";
import { Link, useLocation } from "react-router-dom";

function TasksList() {
  const { loggedInUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    fetchTasks();
  }, [location.pathname]);

  async function fetchTasks() {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function togglePin(ev, taskId) {
    try {
      ev.preventDefault();
      ev.stopPropagation();
      const task = tasks.find((task) => task._id === taskId);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, isPinned: !task.isPinned } : task
        )
      );
      const res = await api.patch(`/tasks/${taskId}`, {
        isPinned: !task.isPinned,
      });
    } catch (error) {
      console.error(error);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, isPinned: !task.isPinned } : task
        )
      );
    }
  }
  const pinnedTasks = [];
  const unpinnedTasks = [];
  tasks.filter((task) => {
    return task.isPinned ? pinnedTasks.push(task) : unpinnedTasks.push(task);
  });

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-5 lg:text-5xl lg:mb-7">
        Hello, {loggedInUser.firstName}
      </h1>
      <div>
        <h2 className="text-2xl font-semibold mb-3">Pinned Tasks</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pinnedTasks.map((task) => (
            <Link key={task._id} className=" h-full" to={`/tasks/${task._id}`}>
              <TaskItem onTogglePin={togglePin} task={task} />
            </Link>
          ))}
        </div>
      </div>
      <div className="my-10">
        <h2 className="text-2xl font-semibold mb-3">Unpinned Tasks</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {unpinnedTasks.map((task) => (
            <Link key={task._id} to={`/tasks/${task._id}`}>
              <TaskItem onTogglePin={togglePin} task={task} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default TasksList;
