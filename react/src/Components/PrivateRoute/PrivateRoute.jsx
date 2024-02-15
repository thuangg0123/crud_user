import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isUserLogin = useSelector((state) => {
    return state.user.isUserLogin;
  });

  return isUserLogin.isAuthenticated === true ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
