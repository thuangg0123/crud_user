import React from "react";

import FormAddNew from "../FormAddNew";
import ImportUser from "../ImportUser";
import SearchUser from "../SearchUser";
import Table from "../Table";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

function Home() {
  const isUserLogin = useSelector((state) => {
    return state.user.isUserLogin;
  });
  let navigate = useNavigate();

  const hanldeGoToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <button onClick={() => hanldeGoToLogin()}>Login</button>
      <SearchUser />
      <div>
        <ImportUser />
        <FormAddNew />
      </div>
      <Table />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Home;
