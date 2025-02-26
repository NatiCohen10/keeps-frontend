import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { Button } from "@/components/ui/button";
import { useClickAway } from "@uidotdev/usehooks";
import { useToast } from "@/components/ui/use-toast";

function CreateTaskpage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    body: "",
    todoList: [],
  });
  const handleClose = () => {
    navigate(-1);
  };

  const dialogRef = useClickAway(handleClose);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTodo = () => {
    setTaskData((prevData) => ({
      ...prevData,
      todoList: [...prevData.todoList, { title: "", isComplete: false }],
    }));
  };

  const handleTodoChange = (index, e) => {
    const { name, value, checked, type } = e.target;
    const updatedTodos = [...taskData.todoList];
    if (type === "checkbox") {
      updatedTodos[index] = {
        ...updatedTodos[index],
        [name]: checked,
      };
    } else {
      updatedTodos[index] = {
        ...updatedTodos[index],
        [name]: value,
      };
    }
    setTaskData((prevData) => ({
      ...prevData,
      todoList: updatedTodos,
    }));
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = [...taskData.todoList];
    updatedTodos.splice(index, 1);
    setTaskData((prevData) => ({
      ...prevData,
      todoList: updatedTodos,
    }));
  };

  async function handleCreateTask(ev) {
    ev.preventDefault();
    try {
      const res = await api.post("/tasks", taskData);
      toast({
        title: "Success!",
        description: "Successfully created a task!",
        variant: "success",
      });
      navigate("/tasks"); // Redirect to tasks list or wherever you need
    } catch (error) {
      toast({
        title: "Oops! something went wrong!",
        description: "Something went wrong while trying to create a task",
        variant: "error",
      });
    }
  }

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <DialogContent
        aria-describedby={undefined}
        className="max-w-lg  rounded-lg shadow-lg p-6 w-full "
        ref={dialogRef}
      >
        <DialogTitle className="hidden">Create Task</DialogTitle>
        <Card className="relative py-4">
          <CardHeader>
            <CardTitle>Add a new task</CardTitle>
          </CardHeader>
          <button
            className="absolute right-1 top-1 cursor-pointer"
            onClick={handleClose}
          >
            <X color="red" />
          </button>
          <CardContent>
            <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                  required
                  id="title"
                  name="title"
                  value={taskData.title}
                  onChange={handleInputChange}
                  placeholder="Task title..."
                />
              </div>
              <div>
                <Label htmlFor="description">Task Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={taskData.description}
                  onChange={handleInputChange}
                  placeholder="Task description..."
                />
              </div>
              <div>
                <Label htmlFor="body">Task Content</Label>
                <Input
                  id="body"
                  name="body"
                  value={taskData.body}
                  onChange={handleInputChange}
                  placeholder="Task content..."
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <Label>Todo List</Label>
                <div className=" max-h-[120px] overflow-y-auto flex flex-col gap-2">
                  {taskData.todoList.map((todo, index) => (
                    <div key={index} className="flex items-center gap-2 ">
                      <input
                        type="checkbox"
                        name="isComplete"
                        checked={todo.isComplete}
                        onChange={(e) => handleTodoChange(index, e)}
                      />
                      <Input
                        type="text"
                        name="title"
                        value={todo.title}
                        onChange={(e) => handleTodoChange(index, e)}
                        placeholder="Todo title..."
                      />

                      <Button
                        variant="icon"
                        onClick={() => handleRemoveTodo(index)}
                      >
                        <XCircle color="red" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" type="button" onClick={handleAddTodo}>
                  Add Todo
                </Button>
              </div>
              <Button type="submit" className="  py-2 px-4 rounded ">
                Create Task
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskpage;
