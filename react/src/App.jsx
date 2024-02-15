import "./App.css";
import Home from "./Components/Home/Home";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import { loadUserDataFromLocalStorage } from "./features/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUserDataFromLocalStorage());
    }
  }, []);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
