import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dataUsername = "xxx@gmail";
  const dataPassword = "123456";

  function login() {
    if (username === dataUsername && password === dataPassword) {
      alert("สำเร็จ");
      setPassword("");
      setUsername("");
    } else {
      alert("ผิด");
    }
  }
  function clear() {
    setUsername("");
    setPassword("");
  }

  return (
    <div className="login__page">
      <h1>Login page </h1>
      <div className="Login__input">
        <p>username </p>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="Login__input">
        <p>password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </div>
      <div className="btn__Login">
        <button onClick={login}>Login</button>
        <button onClick={clear}>clear</button>
      </div>
    </div>
  );
};

export default Login;
