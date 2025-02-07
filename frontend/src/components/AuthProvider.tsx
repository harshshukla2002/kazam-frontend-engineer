import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthProvider = ({ children }: any) => {
  const { token } = useSelector((state: any) => state.userReducer);

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default AuthProvider;
