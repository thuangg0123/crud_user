import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

import { userLogin } from "../../features/userSlice";

function Login() {
  let navigate = useNavigate();
  const isUserLogin = useSelector((state) => {
    return state.user.isUserLogin;
  });
  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });
  const isLoading = useSelector((state) => {
    return state.user.isLoading;
  });
  const isError = useSelector((state) => {
    return state.user.isError;
  });

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

  const dispatch = useDispatch();
  const defaultValueInput = {
    email: "",
    password: "",
  };
  const [valueInput, setValueInput] = useState(defaultValueInput);

  const handleLogin = async () => {
    try {
      const { email, password } = valueInput;
      if (!email || !password) {
        toast.error("Please enter email and password");
        return;
      } else if (email.length < 8 || password.length < 6) {
        toast.error("Email/password length must be greater than 6");
        return;
      }

      const response = await dispatch(userLogin({ email, password }));
      if (response.payload) {
        toast.success(response.payload);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error("Email or password is incorrect");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="container">
          <div className="row px-3 px-sm-0">
            <div className="content-left col-12 d-none col-sm-7 d-sm-block">
              <div className="brand">Sol</div>
              <div className="detail">
                Sol helps you connect and share with the people in your life.
              </div>
            </div>
            <div className="content-right col-sm-5 col-12 shadow-lg green d-flex flex-column gap-3">
              <div className="brand d-sm-none">Sol</div>
              <input
                type="text"
                className="form-control"
                placeholder="Email address or phone number"
                value={valueInput.email}
                onChange={(event) =>
                  setValueInput({ ...valueInput, email: event.target.value })
                }
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={valueInput.password}
                onChange={(event) =>
                  setValueInput({ ...valueInput, password: event.target.value })
                }
              />
              <button className="btn btn-primary" onClick={() => handleLogin()}>
                Login
              </button>
              <span className="text-center">
                <a href="#" className="forgot-password">
                  Forgot your password?
                </a>
              </span>
              <hr />
              <div className="text-center">
                <button className="btn btn-success">Create new account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default Login;
