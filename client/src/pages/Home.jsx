import React from "react";
import "../styles/pages/Home.scss";
import image from "../assests/kec1.png";
const Home = () => {
  return (
    <div id="home">
      <img className="image" src={image}></img>
    </div>
  );
};

export default Home;
