import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/style.css";
import Logo from "./logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/login", {
        username,
        password,
      });
      if (response.data.error) {
        // Display the error message on the page
        alert(response.data.error);
      } else {
        // Handle successful login
        console.log(response.data.message);
        // Redirect the user to the upload/camera page or dashboard
        navigate("/upload");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="login">
      <div className="login-left">
        <img src={Logo} alt="" className="login-logo" />
        <p>
          BinSense is a platform for you to understand and track your waste
          seggregation.
        </p>
      </div>
      <div className="login-right">
        <h2>Login Here</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p className="thing">
          New Here? Create an account{" "}
          <Link to="/signup" className="hover-link thing-link">
            Sign Up
          </Link>
        </p>
      </div>
      {/* <nav>
        <div className="flex main-nav">
          <div className="logo-class flex">
            <Link to="/" className="company-logo img">
              <img src={Logo} alt="company-logo" />
            </Link>
            <h2 className="logo-name">BinSense</h2>
          </div>
          <div className="nav-links">
            <ul className="flex">
              <li>
                <Link to="/" className="hover-link secondary-button">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover-link primary-button">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      {/* <div className="login flex">
          <div className="login-left">
            <img src={Logo} className="login-logo" alt="logo" />
            <p>
              BinSense is a platform for you to understand and track your waste
              seggregation.
            </p>
          </div>
          <div className="login-right">
            <form onSubmit={handleSubmit} className="login-right">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div> */}
      {/* <div>
        <div className="header-left login-left">
          <img src={Logo} className="login-logo" alt="" />
          <h2 className="logo-name">BinSense</h2>
        </div>
        <div className="header-right login-right"></div>
      </div> */}
    </div>
  );
};

export default Login;
