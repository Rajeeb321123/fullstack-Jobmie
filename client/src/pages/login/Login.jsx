// Login page

import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { json, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const accessToken = Cookies.get("accessToken");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest(accessToken).post("/auth/login", { username, password });
      
      // navigate("/")


      // USE OF LOCAL STORAGE
      // In reality : we should be using Reducer or context api, local storage is jsut for very very beginner projects
      // we can only store string to our local storage but we are getting object or JSON of Object( Json can only hold object or array) from our backend as response
      // so we have to stringfy the object
      // localStorage.setItem("currentUser", JSON.stringify(res.data));
      const dataString = JSON.stringify(res.data.userInfo);
      console.log(dataString)
      localStorage.setItem("currentUser",dataString );

      // navigate("/");

      console.log(res.data.accesstoken);
      Cookies.set('accessToken', res.data.accesstoken, );

      // console.log(res.data);
      // console.log(dataString)

    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && (
          <span>{error}</span>
          
          )}
      </form>
    </div>
  );
}

export default Login;