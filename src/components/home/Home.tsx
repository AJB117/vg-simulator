import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import circle from "../../assets/circle.png";
import "./home.css";

const Home: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Welcome to Cardfight!! Vanguard Simulator</h1>
        <img src={circle} className="App-logo" alt="logo" />
        <div className="login-divider">
          <div className="login">
            <Link to="/login" className="App-link">
              <Button style={{ fontSize: "1rem" }}>Log In</Button>
            </Link>
          </div>
          <div className="signup">
            <Link to="/signup" className="App-link">
              <Button style={{ fontSize: "1rem" }}>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
