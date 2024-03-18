import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../components/style.css";
import Logo from "./logo.png";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5001/signup", {
        username,
        password,
      });

      if (response.data.error) {
        // Display the error message on the page
        alert(response.data.error);
      } else {
        // Handle successful sign up
        console.log(response.data.message);
        // Optionally, you can redirect the user to the login page
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      <div className="signup">
      <div className="signup-left">
         <h2>Sign Here</h2>
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
          <button type="submit">SignUp</button>
        </form>
        <p className="thing">
          Already have an account?{" "}
          <Link to="/login" className="hover-link thing-link">
            Login
          </Link>
        </p>
      </div>
      <div className="signup-right">
        <img src={Logo} alt="" className="login-logo" />
        <p>
          BinSense is a platform for you to understand and track your waste
          seggregation.
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
                <Link to="/login" className="hover-link primary-button">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
    </div>
    </div>
  );
};

export default SignUp;
