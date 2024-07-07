import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import TodoCheckbox from "../components/ui/TodoCheckbox";
import { Pin, PinOff } from "lucide-react";
import api from "../lib/api";

function TaskItem(props) {
  const { task, onTogglePin } = props;
  const [todoList, setTodoList] = useState(task.todoList);

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
        <CardContent>
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
        </CardContent>
      </Card>
    </>
  );
}

export default TaskItem;
