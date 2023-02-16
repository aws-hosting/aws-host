import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Sidebar from "./components/Sidebar";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewBooking from "./pages/NewBooking";
import NewClass from "./pages/NewClass";
import SeatAllocation from "./pages/SeatAllocation";

const App = () => {
  const [login, setLogin] = useState(false);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin setLogin={setLogin} />} />
      <Route
        path="/"
        element={
          <ProtectedRoutes login={login}>
            <Sidebar>
              <Home />
            </Sidebar>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/newHall"
        element={
          <ProtectedRoutes login={login}>
            <Sidebar>
              <NewBooking />
            </Sidebar>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/newClass"
        element={
          <ProtectedRoutes login={login}>
            <Sidebar>
              <NewClass />
            </Sidebar>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/allocateHall"
        element={
          <ProtectedRoutes login={login}>
            <Sidebar>
              <SeatAllocation />
            </Sidebar>
          </ProtectedRoutes>
        }
      ></Route>
    </Routes>
  );
};

export default App;
