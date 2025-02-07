import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Slide, toast } from "react-toastify";

import "./styles.css";
import { SignupForm } from "./interface";
import { useDispatch, useSelector } from "react-redux";
import {
  setToken,
  setUser,
  setUserIsError,
  setUserIsLoading,
} from "../../redux/user.reducer";

const intialState = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [signupForm, setSignupForm] = useState<SignupForm>(intialState);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.userReducer);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    dispatch(setUserIsLoading());
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/register`,
        signupForm
      );
      toast.success("Login Successful", {
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
    <form className="signup-container" onSubmit={submitForm}>
      <h2>Sign Up</h2>
      <div className="label-container">
        <p>Name: </p>
        <input
          type="text"
          placeholder="enter name"
          name="name"
          value={signupForm.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="label-container">
        <p>Email: </p>
        <input
          type="email"
          placeholder="name@mail.com"
          name="email"
          value={signupForm.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="label-container">
        <p>Password: </p>
        <input
          className="input"
          type="password"
          name="password"
          value={signupForm.password}
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
        {isLoading ? "Loading..." : "Signup"}
      </button>

      <div className="bottom-text">
        <p>
          Already have a account?{" "}
          <span onClick={() => navigation("/login")}>Login</span>
        </p>
      </div>
    </form>
  );
};

export default Signup;
