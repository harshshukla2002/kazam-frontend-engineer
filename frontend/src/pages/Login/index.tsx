import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./styles.css";
import {
  setToken,
  setUser,
  setUserIsError,
  setUserIsLoading,
} from "../../redux/user.reducer";
import { LoginForm } from "./interface";
import { Slide, toast } from "react-toastify";
import axios from "axios";

const intialState = {
  email: "",
  password: "",
};

const Login = () => {
  const navigation = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginForm>(intialState);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.userReducer);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    dispatch(setUserIsLoading());
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        loginForm
      );
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Slide,
      });
      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.token));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigation("/");
    } catch (error: any) {
      console.error(error.response.data.message || error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Slide,
      });
      dispatch(setUserIsError());
    }
  };

  return (
    <form className="login-container" onSubmit={submitForm}>
      <h2>Login</h2>
      <div className="label-container">
        <p>Email: </p>
        <input
          type="email"
          placeholder="name@mail.com"
          name="email"
          value={loginForm.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="label-container">
        <p>Password: </p>
        <input
          className="input"
          type={showPassword ? "text" : "password"}
          name="password"
          value={loginForm.password}
          onChange={handleChange}
          required
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
            style={{ width: "20px" }}
            size={50}
          />
          <p>Show Password</p>
        </div>
      </div>
      <div className="checkbox-container">
        <input type="checkbox" style={{ width: "20px" }} size={50} required />
        <p>I accept all terms and conditions.</p>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </button>

      <div className="bottom-text">
        <p>
          Don't have a account?{" "}
          <span onClick={() => navigation("/signup")}>Signup</span>
        </p>
      </div>
    </form>
  );
};

export default Login;
