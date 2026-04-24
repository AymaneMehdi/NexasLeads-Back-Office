import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Element />;
};

export default PrivateRoute;
