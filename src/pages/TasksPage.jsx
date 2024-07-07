import TasksList from "@/components/TasksList";
import React from "react";
import { Outlet } from "react-router-dom";

function TasksPage() {
  return (
    <>
      <TasksList />
      <Outlet />
    </>
  );
}

export default TasksPage;
