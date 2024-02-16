import "./App.css";
import Home from "./Components/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { userLogin } from "./features/userSlice";
import { useNavigate } from "react-router-dom";

import { loadUserDataFromLocalStorage } from "./features/userSlice";

function App() {
  let navigate = useNavigate();

  const isUserLogin = useSelector((state) => {
    return state.user.isUserLogin;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUserDataFromLocalStorage());
    }
  }, []);

  useEffect(() => {
    if (isUserLogin && isUserLogin.isAuthenticated === false) {
      navigate("/login");
    }
  }, [isUserLogin]);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
