import "./App.css";
import "./queries.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import TodosPage from "./pages/TodosPage";
import Error from "./components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
    errorElement: <Error error="Page not found(404)" />,
  },
  { path: "/auth", element: <AuthPage /> },
  { path: "/todos", element: <TodosPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
