import { RiTodoFill } from "react-icons/ri";

const Header = () => {
  return (
    <header className="header">
      <div className="main-header-container">
        <div className="logo-container">
          <RiTodoFill className="todo-logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
