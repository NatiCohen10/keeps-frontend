import React, { useState } from "react";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function TaskItem(props) {
  const { task, onTogglePin, setTasks, tasks } = props;
  const [todoList, setTodoList] = useState(task.todoList);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function toggleIsChecked(ev, todoId) {
    try {
      ev.preventDefault();
      ev.stopPropagation();

      const todoToToggle = todoList.map((todo) => {
        if (todo._id === todoId) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
      setTodoList(todoToToggle);
      await api.patch(`/tasks/${task._id}`, { todoList: todoToToggle });
    } catch (error) {
      console.error(error);
      const todoToToggle = todoList.map((todo) => {
        if (todo._id === todoId) {
          return { ...todo, isComplete: todo.isComplete };
        }
        return todo;
      });
      setTodoList(todoToToggle);
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
      <Card className=" flex flex-col justify-between h-full">
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
            {todoList.map((todo) => {
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
        <AlertDialogContent>
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
            <AlertDialogAction onClick={(ev) => handleDeleteTask(task._id, ev)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default TaskItem;
