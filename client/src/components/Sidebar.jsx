import React from "react";
import "./../styles/components/Sidebar.scss";
import logo from "../assests/logo.png";
import { Link } from "react-router-dom";

function Sidebar({ children }) {
  return (
    <div id="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-contents">
          <div className="sidebar-header">
            <img className="sidebar-logo" src={logo} />

            <ul className="sidebar-nav">
              <li>
                {/* <a href="#">Allocate Hall</a> */}
                <Link to={"/allocateHall"}>Allocate Hall</Link>
              </li>
              <li>
                {/* <a href="#">Add Class</a> */}
                <Link to={"/newClass"}>Add Class</Link>
              </li>
              <li>
                <Link to={"/newHall"}>Add Hall</Link>
                {/* <a href="#">Add Hall</a> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sidebar-children">{children}</div>
    </div>
  );
}

export default Sidebar;
