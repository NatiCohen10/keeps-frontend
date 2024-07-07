import React from "react";
import { Checkbox } from "./checkbox";

function TodoCheckbox(props) {
  const { todo, toggleIsChecked } = props;
  return (
    <div className=" flex items-center gap-3 mb-2" key={todo._id}>
      <Checkbox
        id={todo._id}
        checked={todo.isComplete}
        onClick={(ev) => {
          toggleIsChecked(ev, todo._id);
        }}
      />
      <label
        className=" cursor-pointer"
        onClick={(ev) => {
          console.log(todo.title);
          ev.stopPropagation();
        }}
        htmlFor={todo._id}
      >
        {todo.title}
      </label>
    </div>
  );
}

export default TodoCheckbox;
