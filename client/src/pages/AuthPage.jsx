import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { IoAlertCircleOutline } from "react-icons/io5";
import AuthForm from "../components/auth/AuthForm";
import Header from "../components/auth/Header";

const formInitialState = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const AuthPage = () => {
  const [isLogIn, setIsLogIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState(formInitialState);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const authToggleHandler = () => {
    // On switch b/w login and sign up, error set to null and set form fields to empty
    setError(null);
    setFormDetails(formInitialState);
    setIsLogIn((prevState) => !prevState);
  };

  const inputChangeHandler = (e) => {
    setFormDetails((prevState) => {
      const newFormDetails = { ...prevState };
      let modifiedField = e.target.id;
      // Change id confirm-password to match key passwordConfirm
      if (modifiedField === "confirm-password") {
        modifiedField = "passwordConfirm";
      }
      newFormDetails[modifiedField] = e.target.value;
      return newFormDetails;
    });
  };

  const authRequest = async (path, body) => {
    try {
      const res = await axiosInstance.post(path, body);
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/todos");
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };

  const userFormSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      setIsLoading(true);
      if (isLogIn) {
        await authRequest("/users/login", {
          email: formDetails.email,
          password: formDetails.password,
        });
      } else {
        await authRequest("/users/signup", formDetails);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="auth">
      <Header />
      <div className="main-container">
        <div className="title-container">
          <h2 className="title">Todo Tracker</h2>
          <div className="underline"></div>
        </div>
        {error && (
          <p className="alert alert-danger">
            <IoAlertCircleOutline className="alert-icon" />
            <span>{error}</span>
          </p>
        )}
        <AuthForm
          isLogIn={isLogIn}
          isLoading={isLoading}
          authToggleHandler={authToggleHandler}
          inputChangeHandler={inputChangeHandler}
          userFormSubmitHandler={userFormSubmitHandler}
        />
      </div>
    </div>
  );
};

export default AuthPage;
