import NotFound from "../components/NotFound";
import AuthProvider from "../components/AuthProvider";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Tasks from "../pages/Tasks";
import React from "react";
import { Route, Routes } from "react-router-dom";

function MainRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <AuthProvider>
            <Tasks />
          </AuthProvider>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default MainRouter;
