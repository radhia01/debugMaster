import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute = () => {
  let auth = localStorage.getItem("userToken");
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
