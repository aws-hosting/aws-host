import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewBooking from "./pages/NewBooking";
import NewClass from "./pages/NewClass";
import SeatAllocation from "./pages/SeatAllocation";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/"
        element={
          <Sidebar>
            <Home />
          </Sidebar>
        }
      />
      <Route
        path="/newHall"
        element={
          <Sidebar>
            <NewBooking />
          </Sidebar>
        }
      />
      <Route
        path="/newClass"
        element={
          <Sidebar>
            <NewClass />
          </Sidebar>
        }
      />
      <Route
        path="/allocateHall"
        element={
          <Sidebar>
            <SeatAllocation />
          </Sidebar>
        }
      ></Route>
    </Routes>
  );
};

export default App;
