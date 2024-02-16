import React from "react";

import FormAddNew from "../FormAddNew";
import ImportUser from "../ImportUser";
import SearchUser from "../SearchUser";
import Table from "../Table";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import ExportUsers from "../ExportUsers";

import InfoUser from "../InfoUser";

function Home() {
  const isUserLogin = useSelector((state) => {
    return state.user.isUserLogin;
  });
  let navigate = useNavigate();

  return (
    <>
      {isUserLogin && isUserLogin.isAuthenticated === true ? (
        <InfoUser />
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
      <SearchUser />
      <div>
        <ExportUsers />
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
