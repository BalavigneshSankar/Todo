import { AiOutlineDelete } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import { RiTodoFill } from "react-icons/ri";
import { useState } from "react";

const Todo = ({ id, cAt, value, editTodoHandler, deleteTodoHandler }) => {
  const [isDone, setIsDone] = useState(false);

  return (
    <div className={`todo-row ${isDone ? "todo-done" : ""}`}>
      <RiTodoFill className="todo-icon" />
      <div className="todo-details">
        <p className="todo-created-at">{cAt}</p>
        <p className={`todo-value`}>
          {value.length <= 15 ? value : `${value.slice(0, 15)}...`}
        </p>
      </div>
      <button className="btn-edit-todo" onClick={() => editTodoHandler(id)}>
        <GoPencil className="edit-icon" />
      </button>
      <button
        className="btn-delete-todo"
        onClick={() => {
          setIsDone(true);
          deleteTodoHandler(id);
        }}
      >
        <AiOutlineDelete className="delete-icon" />
      </button>
    </div>
  );
};

export default Todo;
