import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import logo from "../assests/logo.png";
import ButtonPrimary from "../components/ButtonPrimary";
import "./../styles/pages/AdminLogin.scss";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const tempEmail = "admin";
  const tempPass = "admin123";

  const [disabled, setDisabled] = useState(false);

  const changeHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setDisabled(true);
    e.preventDefault();
    if (
      loginDetails.email !== tempEmail ||
      loginDetails.password !== tempPass
    ) {
      NotificationManager.error("Invaild Mail or Password", "Error", 5000);
    } else {
      navigate("/");
      NotificationManager.success("Login Successfull", "Success", 5000);
    }
    setDisabled(false);
  };

  return (
    <div id="login-container">
      <div className="navbar-login">
        <img src={logo} alt="KEC LOGO" className="navbar-logo" />
        <p className="navbar-logo-name">Kongu Engineering College</p>
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={submitHandler}>
          <div className="login-heading-des">
            <h1 className="login-title">Login</h1>
            <p className="login-des">
              Welcome back! Login to access the KEC Exam Booking
            </p>
          </div>
          <div className="login-elements">
            <input
              className="login-text-field"
              placeholder="Email"
              name="email"
              value={loginDetails.email}
              required
              onChange={changeHandler}
            />
          </div>
          <div className="login-elements">
            <input
              className="login-text-field"
              placeholder="Password"
              name="password"
              type={"password"}
              value={loginDetails.password}
              required
              onChange={changeHandler}
            />
          </div>
          <div className="login-button-container">
            <ButtonPrimary
              type={"submit"}
              style={{ width: "30rem" }}
              disabled={disabled}
            >
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="login-btn-icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="login-btn-text">Continue</p>
              </>
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

//notification notification-error notification-enter-done
