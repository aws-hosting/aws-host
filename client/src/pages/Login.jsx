import React, { useState } from "react";
import "./../styles/pages/AdminLogin.scss";
import logo from "../assests/logo.png";
import ButtonPrimary from "../components/ButtonPrimary";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const submitHandler = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      const response = await fetch(
        `http://35.77.45.226:8000/v1/halls/info/${loginDetails.rollNo}`
      );

      const json = await response.json();
      console.log(json.data);
      if (json.data.length > 0) {
        setCardData(json.data);
      } else {
        NotificationManager.error("Roll No Does not exist", "Error", 5000);
      }
    };

    fetchData();
  };

  const [loginDetails, setLoginDetails] = useState({
    rollNo: "",
  });

  const [disabled, setDisabled] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [showHall, setShowHall] = useState(true);

  const changeHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
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
            <h1 className="login-title">KEC Exam Hall</h1>
            <p className="login-des">Welcome back!</p>
          </div>
          <div className="login-elements">
            <input
              className="login-text-field"
              placeholder="Roll No"
              name="rollNo"
              type={"text"}
              value={loginDetails.rollNo}
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
                <p className="login-btn-text">See Exam Hall</p>
              </>
            </ButtonPrimary>
          </div>
        </form>
      </div>
      {showHall && (
        <div className="login-heading-des">
          <div>
            {cardData.map((card) => {
              return (
                <div className="card">
                  <p className="title">Name : {card.name}</p>
                  <p className="title">Subject : {card.subject}</p>
                  <p className="title">Hall : {card.hall}</p>
                  <p className="title">Table : {card.table}</p>
                </div>
              );
            })}

            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
