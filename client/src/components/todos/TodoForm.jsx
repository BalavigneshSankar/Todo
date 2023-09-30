import { AiOutlinePlus } from "react-icons/ai";

const TodoForm = ({ submitTodoHandler, setTodo, todo }) => {
  return (
    <form className="todo-form" onSubmit={submitTodoHandler}>
      <input
        type="text"
        className="todo-input"
        placeholder="Enter tour todo..."
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button type="submit" className="btn btn-add-todo">
        <AiOutlinePlus />
      </button>
    </form>
  );
};

export default TodoForm;
