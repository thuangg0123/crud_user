import React from "react";
import "./style.scss";

function Login() {
  return (
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
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
            <button className="btn btn-primary">Login</button>
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
  );
}

export default Login;
