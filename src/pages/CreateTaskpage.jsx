// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useClickAway } from "@uidotdev/usehooks";
// import { X } from "lucide-react";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// function CreateTaskpage() {
//   const navigate = useNavigate();
//   const handleClose = () => {
//     navigate(-1);
//   };
//   const dialogRef = useClickAway(handleClose);

//   function handleSubmit(e) {
//     e.preventDefault();
//   }

//   return (
//     <Dialog
//       open={true}
//       onClose={handleClose}
//       className="fixed inset-0 z-50 flex items-center justify-center  "
//     >
//       <DialogContent
//         aria-describedby={undefined}
//         className="max-w-lg  rounded-lg shadow-lg p-6 w-full "
//         ref={dialogRef}
//       >
//         <DialogTitle className="hidden"></DialogTitle>
//         <Card className="relative py-4">
//           <CardHeader>
//             <CardTitle>Add a new task</CardTitle>
//           </CardHeader>
//           <button
//             className=" absolute right-1 top-1 cursor-pointer "
//             onClick={handleClose}
//           >
//             <X color="red" />
//           </button>
//           <CardContent>
//             <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
//               <div>
//                 <Label htmlFor="title">Task Title</Label>
//                 <Input
//                   required
//                   id="title"
//                   name="title"
//                   placeholder="Task title..."
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="description">Task Description</Label>
//                 <Input
//                   id="description"
//                   name="description"
//                   placeholder="Task description..."
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="body">Task Content</Label>
//                 <Input id="body" name="body" placeholder="Task content..." />
//               </div>
//               <Button className=" text-foreground">Create Task</Button>
//             </form>
//           </CardContent>
//         </Card>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default CreateTaskpage;

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useClickAway } from "@uidotdev/usehooks";

function CreateTaskpage() {
  const navigate = useNavigate();
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

  const handleCreateTask = async () => {
    try {
      console.log(taskData);
      const res = await api.post("/tasks", taskData);
      console.log("Task created:", res.data);
      navigate("/tasks"); // Redirect to tasks list or wherever you need
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

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
            <form className="flex flex-col gap-4">
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
              <div className="flex flex-col gap-2">
                <Label>Todo List</Label>
                {taskData.todoList.map((todo, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="text"
                      name="title"
                      value={todo.title}
                      onChange={(e) => handleTodoChange(index, e)}
                      placeholder="Todo title..."
                    />
                    <input
                      type="checkbox"
                      name="isComplete"
                      checked={todo.isComplete}
                      onChange={(e) => handleTodoChange(index, e)}
                    />
                    <Button
                      variant="icon"
                      onClick={() => handleRemoveTodo(index)}
                    >
                      <XCircle color="red" />
                    </Button>
                  </div>
                ))}
                <Button variant="ghost" type="button" onClick={handleAddTodo}>
                  Add Todo
                </Button>
              </div>
              <button
                type="button"
                onClick={handleCreateTask}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Create Task
              </button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskpage;
