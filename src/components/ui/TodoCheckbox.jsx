import React, { useEffect } from "react";
import { Checkbox } from "./checkbox";
import { useLocation } from "react-router-dom";

function TodoCheckbox(props) {
  const { todo, toggleIsChecked } = props;

  const location = useLocation();
  return (
    <div className=" flex items-center gap-3 mb-2">
      <Checkbox
        id={`list-${todo._id}`}
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
        htmlFor={`list-${todo._id}`}
      >
        {todo.title}
      </label>
    </div>
  );
}

export default TodoCheckbox;
