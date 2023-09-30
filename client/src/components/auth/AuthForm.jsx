import { BiSolidUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { BsFillLockFill } from "react-icons/bs";

const AuthForm = ({
  isLogIn,
  isLoading,
  inputChangeHandler,
  authToggleHandler,
  userFormSubmitHandler,
}) => {
  return (
    <>
      <form className="form-user" onSubmit={userFormSubmitHandler}>
        {!isLogIn && (
          <div className="form-name-container">
            <label htmlFor="name">
              <BiSolidUser />
            </label>
            <input
              type="text"
              id="name"
              onChange={inputChangeHandler}
              placeholder="Name"
            />
          </div>
        )}
        <div className="form-email-container">
          <label htmlFor="email">
            <MdEmail />
          </label>
          <input
            type="email"
            id="email"
            onChange={inputChangeHandler}
            placeholder="Email"
          />
        </div>
        <div className="form-password-container">
          <label htmlFor="password">
            <BsFillLockFill />
          </label>
          <input
            type="password"
            id="password"
            onChange={inputChangeHandler}
            placeholder="Password"
          />
        </div>
        {!isLogIn && (
          <div className="form-confirm-password-container">
            <label htmlFor="confirm-password">
              <BsFillLockFill />
            </label>
            <input
              type="password"
              id="confirm-password"
              onChange={inputChangeHandler}
              placeholder="Confirm Password"
            />
          </div>
        )}
        <button type="submit" className="btn btn-auth--primary">
          {isLoading ? "Loading..." : isLogIn ? "Login" : "Sign up"}
        </button>
      </form>
      <div className="devider">
        <h5>{isLogIn ? "New to Todo Tracker?" : "Already have an account?"}</h5>
      </div>
      <button
        type="button"
        className="btn btn-auth--secondary"
        onClick={authToggleHandler}
      >
        {isLogIn ? "Sign up" : "Login"}
      </button>
    </>
  );
};

export default AuthForm;
