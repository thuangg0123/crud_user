import React from "react";

import FormAddNew from "../FormAddNew";
import ImportUser from "../ImportUser";
import SearchUser from "../SearchUser";
import Table from "../Table";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import ExportUsers from "../ExportUsers";

import { logoutUser } from "../../features/userSlice";

function Home() {
  const isUserLogin = useSelector((state) => {
    return state.user.isUserLogin;
  });
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const hanldeLogout = () => {
    toast.success("Log out success !");
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <>
      {isUserLogin && isUserLogin.isAuthenticated === true ? (
        <div className="py-3">
          <h3 className="text-info">Hello, {isUserLogin.data.username}</h3>
          <button className="btn btn-primary" onClick={() => hanldeLogout()}>
            Logout
          </button>
        </div>
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
