import React, { useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import api from "@/lib/api";
import { useAuth } from "../context/authContext";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "./ui/use-toast";

function TasksList() {
  const { loggedInUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // toast({ title: "hi", description: "bye", variant: "destructive" });

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await api.get("/tasks");

        setTasks(res.data);
      } catch (error) {
        toast({
          title: "Oops! something went wrong!",
          description:
            "Something went wrong while trying to fetch tasks from the server",
          variant: "error",
        });
      }
    }

    fetchTasks();
  }, [location.pathname]);

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
      toast({
        title: "Success!",
        description: "Successfuly updated your task",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Oops! something went wrong!",
        description: "Something went wrong while trying to update a task",
        variant: "error",
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, isPinned: !task.isPinned } : task
        )
      );
    }
  }

  const pinnedTasks = [];
  const unpinnedTasks = [];

  tasks.filter((task) =>
    task.isPinned ? pinnedTasks.push(task) : unpinnedTasks.push(task)
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-5 lg:text-5xl lg:mb-7">
        Hello, {loggedInUser.firstName}
      </h1>
      <div className=" flex justify-center">
        <Button>
          <Link to={"/tasks/create"}>Add new task</Link>
        </Button>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-3">Pinned Tasks</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <Skeleton className=" h-[350px] w-72 sm:w-[450px]" />
          ) : (
            pinnedTasks.map((task) => (
              <Link
                key={task._id}
                className=" h-full"
                to={`/tasks/${task._id}`}
              >
                <TaskItem
                  onTogglePin={togglePin}
                  setTasks={setTasks}
                  task={task}
                  tasks={tasks}
                  loading={loading}
                />
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="my-10">
        <h2 className="text-2xl font-semibold mb-3">Unpinned Tasks</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <>
              <Skeleton className=" h-[350px] w-72 sm:w-[450px]" />
              <Skeleton className=" h-[350px] w-72 sm:w-[450px]" />
            </>
          ) : (
            unpinnedTasks.map((task) => (
              <Link key={task._id} to={`/tasks/${task._id}`}>
                <TaskItem
                  onTogglePin={togglePin}
                  setTasks={setTasks}
                  tasks={tasks}
                  task={task}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default TasksList;
