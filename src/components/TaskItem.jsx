import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import TodoCheckbox from "../components/ui/TodoCheckbox";
import { Pin, PinOff, Trash2 } from "lucide-react";
import api from "../lib/api";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useClickAway } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

function TaskItem(props) {
  const { task, onTogglePin, setTasks, tasks } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const modalRef = useClickAway((ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    setIsDialogOpen(false);
  });

  async function toggleIsChecked(ev, todoId) {
    ev.preventDefault();
    ev.stopPropagation();
    const previousTasks = [...tasks];
    try {
      const todoToToggle = task.todoList.map((todo) => {
        if (todo._id === todoId) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
      const updatedTasks = tasks.map((val) =>
        val._id === task._id ? { ...task, todoList: todoToToggle } : val
      );
      setTasks(updatedTasks);
      await api.patch(`/tasks/${task._id}`, { todoList: todoToToggle });
    } catch (error) {
      console.error(error);
      setTasks(previousTasks);
    }
  }

  async function handleDeleteTask(taskId, ev) {
    ev.stopPropagation();
    ev.preventDefault();
    const previousTasks = tasks;

    try {
      const updatedTasks = tasks?.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
      await api.delete(`/tasks/${taskId}`);
    } catch (error) {
      console.error(error);
      setTasks(previousTasks);
    }
  }

  return (
    <>
      <Card className=" hover:-translate-y-2 transition flex flex-col justify-between h-full">
        <CardHeader>
          <div className=" flex justify-between">
            <div>
              <CardTitle>{task.title}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
            </div>
            <div>
              {task.isPinned ? (
                <PinOff
                  className=" text-primary cursor-pointer"
                  onClick={(ev) => onTogglePin(ev, task._id)}
                />
              ) : (
                <Pin
                  className=" text-primary cursor-pointer"
                  onClick={(ev) => onTogglePin(ev, task._id)}
                  strokeWidth={1.25}
                />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className=" relative">
          <p className="text-lg mb-4">{task.body}</p>
          <div>
            {task.todoList.map((todo) => {
              return (
                <TodoCheckbox
                  key={todo._id}
                  todo={todo}
                  toggleIsChecked={toggleIsChecked}
                />
              );
            })}
          </div>
          <Button
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              setIsDialogOpen(true);
            }}
            variant="icon"
            className=" absolute -right-2 bottom-0"
          >
            <Trash2 color="#f74545" />
          </Button>
        </CardContent>
      </Card>
      <AlertDialog open={isDialogOpen}>
        <AlertDialogContent ref={modalRef}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              task and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={(ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                setIsDialogOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              asChild
              onClick={(ev) => handleDeleteTask(task._id, ev)}
            >
              <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default TaskItem;
