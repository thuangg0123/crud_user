import React from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

import "./style.scss";

function InfoUser() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const isUserLogin = useSelector((state) => {
    return state.user.isUserLogin;
  });

  const hanldeLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Log out success !");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <>
      <div className="py-3">
        <Dropdown as={ButtonGroup}>
          <Button variant="success">Hello, {isUserLogin.data.username} </Button>

          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" onClick={() => hanldeLogout()}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default InfoUser;
