import { Link } from "react-router-dom";

const Error = ({ error }) => {
  return (
    <div className="error">
      <div className="main-container">
        <p className="error">Error: {error || "Something went wrong"}!</p>
        <Link to="/auth" className="login-link">
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Error;
