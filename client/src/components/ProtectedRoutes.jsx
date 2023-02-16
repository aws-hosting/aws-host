import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";

const ProtectedRoutes = ({ login, children }) => {
  const navigate = useNavigate();
  console.log(login);
  if (login) {
    return children;
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 100,
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <h1>You need to Login to Access the Page</h1>
        <ButtonPrimary
          style={{ borderRadius: 5 }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/admin/login");
          }}
        >
          <p>Go To Login</p>
        </ButtonPrimary>
      </div>
    );
  }
};

export default ProtectedRoutes;
