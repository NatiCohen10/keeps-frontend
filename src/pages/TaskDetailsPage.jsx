import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { useClickAway } from "@uidotdev/usehooks";
import { CircleX, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const params = useParams();
  const { taskId } = params;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTask() {
      try {
        setLoading(true);
        const res = await api.get(`/tasks/${taskId}`);

        setTask(res.data);
      } catch (error) {
        toast({
          title: "Oops! something went wrong!",
          description:
            "Something went wrong while trying to fetch tasks from the server",
          variant: "error",
        });
      } finally {
        setLoading(false);
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
      await api.patch(`/tasks/${taskId}`, {
        todoList: todoListToPost,
      });
      toast({
        title: "Success!",
        description: "Successfuly updated your task",
        variant: "success",
      });
      setNewTodo("");
    } catch (error) {
      toast({
        title: "Oops! something went wrong!",
        description: "Something went wrong while trying to update a task",
        variant: "error",
      });
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

      setTask((prev) => {
        return { ...prev, todoList: updatedTodos };
      });
      await api.patch(`/tasks/${taskId}`, {
        todoList: updatedTodos,
      });
      toast({
        title: "Success!",
        description: "Successfuly deleted a todo",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Oops! something went wrong!",
        description: "Something went wrong while trying to delete a todo",
        variant: "error",
      });
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
            <>
              {loading ? (
                <div className=" space-y-3">
                  <Skeleton className=" w-64 h-32" />

                  <Skeleton className=" w-64 h-8" />
                  <Skeleton className=" w-64 h-8" />
                  <Skeleton className=" w-64 h-8" />
                </div>
              ) : (
                <div className=" relative flex flex-col gap-5">
                  <div>
                    <h1 className="text-2xl font-bold">{task?.title}</h1>
                    <h2 className=" text-muted-foreground">
                      {task?.description}
                    </h2>
                  </div>
                  <p>{task?.body}</p>
                  <div className=" flex flex-col gap-2 max-h-80 overflow-y-auto">
                    {task?.todoList.map((todo) => {
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
                    <form onSubmit={handleAddTodo} className="flex gap-2 mt-4">
                      <Input
                        required
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter new todo..."
                      />
                      <Button>Add Todo</Button>
                    </form>
                  </div>
                </div>
              )}
            </>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailsPage;
