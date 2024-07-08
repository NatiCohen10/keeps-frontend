import TodoCheckbox from "@/components/ui/TodoCheckbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { useClickAway } from "@uidotdev/usehooks";
import { CircleX, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function makeId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters[randomIndex];
  }

  return result;
}

function TaskDetailsPage() {
  const [task, setTask] = useState(null);
  const [newTodo, setNewTodo] = useState("");

  const params = useParams();
  const { taskId } = params;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await api.get(`/tasks/${taskId}`);

        setTask(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTask();
  }, []);

  const handleClose = () => {
    navigate(-1);
  };

  const dialogRef = useClickAway(handleClose);

  async function toggleIsComplete(ev, todoId) {
    try {
      const todoToToggle = task.todoList.map((todo) => {
        if (todo._id === todoId) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
      setTask((prev) => {
        return { ...prev, todoList: todoToToggle };
      });
      await api.patch(`/tasks/${taskId}`, {
        todoList: todoToToggle,
      });
    } catch (error) {
      console.error(error);
      const todoToToggle = task.todoList.map((todo) => {
        if (todo._id === todoId) {
          return { ...todo, isComplete: todo.isComplete };
        }
        return todo;
      });
      setTask((prev) => {
        return { ...prev, todoList: todoToToggle };
      });
    }
  }

  async function handleAddTodo() {
    const todoId = makeId(10);
    try {
      const todoToRender = {
        _id: todoId,
        title: newTodo,
        isComplete: false,
      };
      const todoToPost = {
        title: newTodo,
        isComplete: false,
      };

      const todoListToRender = [...task.todoList, todoToRender];
      const todoListToPost = [...task.todoList, todoToPost];
      setTask((prev) => ({
        ...prev,
        todoList: todoListToRender,
      }));
      console.log("todoListToRender:", todoListToRender);
      await api.patch(`/tasks/${taskId}`, {
        todoList: todoListToPost,
      });
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
      const prevTodoList = task.todoList.filter((todo) => todo._id !== todoId);
      setTask((prev) => ({ ...prev, todoList: prevTodoList }));
    }
  }

  async function handleDeleteTodo(todoId) {
    const previousTodos = task.todoList;
    try {
      const updatedTodos = task.todoList.filter((todo) => {
        return todo._id !== todoId;
      });
      console.log(updatedTodos);
      setTask((prev) => {
        return { ...prev, todoList: updatedTodos };
      });
      await api.patch(`/tasks/${taskId}`, {
        todoList: updatedTodos,
      });
    } catch (error) {
      console.error(error);
      setTask((prev) => ({ ...prev, todoList: previousTodos }));
    }
  }

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center  "
    >
      <DialogContent
        aria-describedby={undefined}
        className="max-w-lg  rounded-lg shadow-lg p-6 w-full "
        ref={dialogRef}
      >
        <DialogTitle className="hidden">{task?.title}</DialogTitle>
        <Card className="relative py-4">
          <button
            className=" absolute right-1 top-1 cursor-pointer "
            onClick={handleClose}
          >
            <X color="red" />
          </button>
          <CardContent>
            {task ? (
              <>
                <div className=" relative flex flex-col gap-5">
                  <div>
                    <h1 className="text-2xl font-bold">{task.title}</h1>
                    <h2 className=" text-muted-foreground">
                      {task.description}
                    </h2>
                  </div>
                  <p>{task.body}</p>
                  <div className=" flex flex-col gap-2">
                    {task.todoList.map((todo) => {
                      return (
                        <div
                          key={todo._id}
                          className=" flex justify-between items-center"
                        >
                          <div className=" flex items-center gap-3 mb-2">
                            <Checkbox
                              id={`${todo._id}`}
                              checked={todo.isComplete}
                              onClick={(ev) => {
                                toggleIsComplete(ev, todo._id);
                              }}
                            />
                            <label
                              className=" cursor-pointer"
                              onClick={(ev) => {
                                console.log(todo.title);
                              }}
                              htmlFor={`${todo._id}`}
                            >
                              {todo.title}
                            </label>
                          </div>
                          <Button
                            variant="icon"
                            onClick={() => handleDeleteTodo(todo._id)}
                          >
                            <CircleX color="red" />
                          </Button>
                        </div>
                      );
                    })}
                    <div className="flex gap-2 mt-4">
                      <Input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter new todo..."
                      />
                      <Button onClick={handleAddTodo}>Add Todo</Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailsPage;
