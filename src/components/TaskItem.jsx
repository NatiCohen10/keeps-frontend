import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Pin, PinOff } from "lucide-react";

function TaskItem(props) {
  const { task, onTogglePin } = props;
  const [todoList, setTodoList] = useState(task.todoList);

  function toggleIsChecked(ev, todoId) {
    ev.stopPropagation();
    const todoToToggle = todoList.map((todo) => {
      if (todo._id === todoId) {
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });
    setTodoList(todoToToggle);
  }

  return (
    <>
      <Card>
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
                <div className=" flex items-center gap-3 mb-2" key={todo._id}>
                  <Checkbox
                    id={todo.title}
                    checked={todo.isComplete}
                    onClick={(ev) => {
                      toggleIsChecked(ev, todo._id);
                    }}
                  />
                  <label className=" cursor-pointer" htmlFor={todo.title}>
                    {todo.title}
                  </label>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default TaskItem;
