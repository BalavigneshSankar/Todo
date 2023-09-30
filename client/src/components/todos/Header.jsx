import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoAlertSharp } from "react-icons/io5";
import { RiTodoFill } from "react-icons/ri";

const Header = ({ userName, error }) => {
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);

  const navigate = useNavigate();

  const toggleLogOutBtnHandler = () => {
    if (!error) {
      setShowLogoutBtn((prevState) => !prevState);
    }
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <header className="header">
      <div className="main-header-container">
        <div className="logo-container">
          <RiTodoFill className="todo-logo" />
        </div>
        <div className="user-container" onClick={toggleLogOutBtnHandler}>
          <p className="user">{!error ? userName : <IoAlertSharp />}</p>
        </div>
        {showLogoutBtn && (
          <nav>
            <ul>
              <li>
                <button
                  type="button"
                  className="btn btn-logout"
                  onClick={logOutHandler}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
