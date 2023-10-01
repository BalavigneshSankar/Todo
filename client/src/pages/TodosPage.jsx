import { useEffect, useState, useCallback } from "react";
import Header from "../components/todos/Header";
import TodoForm from "../components/todos/TodoForm";
import Todo from "../components/todos/Todo";
import axiosInstance from "../axios/axiosInstance";
import Error from "../components/Error";

const TodosPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todo, setTodo] = useState("");
  const [userName, setUserName] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [error, setError] = useState("");

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/todos", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const userName = res.data.data.user.name;
      const todos = res.data.data.user.todos;
      setUserName(userName.charAt(0));
      setTodos(todos);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const submitTodoHandler = async (e) => {
    try {
      e.preventDefault();
      if (todo.length === 0) return;
      // Capitalize first character
      const todoModified = `${todo.at(0).toUpperCase()}${todo.slice(1)}`;

      // On todo edit
      if (editTodoId) {
        const res = await axiosInstance.patch(
          `/todos/${editTodoId}`,
          { value: todoModified },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const updatedTodos = res.data.data.updatedUser.todos;
        setTodos(updatedTodos);
        setEditTodoId(null);
        setTodo("");
      }

      // On todo add
      if (!editTodoId) {
        const res = await axiosInstance.post(
          "/todos",
          { value: todoModified },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const updatedTodos = res.data.data.updatedUser.todos;
        setTodos(updatedTodos);
        setTodo("");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteTodoHandler = async (todoId) => {
    try {
      const res = await axiosInstance.delete(`/todos/${todoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const updatedTodos = res.data.data.updatedUser.todos;
      setTodos(updatedTodos);
    } catch (error) {
      setError(error.message);
    }
  };

  const editTodoHandler = (todoId) => {
    const editTodo = todos.find((t) => t._id === todoId);
    setTodo(editTodo.value);
    setEditTodoId(todoId);
  };

  let content = <div className="loading"></div>;

  if (!isLoading && error) {
    content = <Error error={error} />;
  }

  if (!isLoading && !error) {
    content = (
      <>
        <TodoForm
          submitTodoHandler={submitTodoHandler}
          setTodo={setTodo}
          todo={todo}
        />
        {todos.length > 0 ? (
          <div className="todos-table">
            {todos.map((t) => (
              <Todo
                key={t._id}
                id={t._id}
                cAt={t.cAt}
                value={t.value}
                editTodoHandler={editTodoHandler}
                deleteTodoHandler={deleteTodoHandler}
              />
            ))}
          </div>
        ) : (
          <p className="no-todos">No pending Todos...</p>
        )}
      </>
    );
  }

  return (
    <div className="todos">
      <Header userName={userName} error={error} />
      <div className="main-container">
        <div className="title-container">
          <h2 className="title">Todo Tracker</h2>
        </div>
        {content}
      </div>
    </div>
  );
};

export default TodosPage;
