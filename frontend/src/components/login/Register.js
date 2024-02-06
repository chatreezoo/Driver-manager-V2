import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log({ username, password });

  return (
    <div className="register__page">
      <div>
        <h1>Register page</h1>
        <p> username </p>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <p> password </p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <p> Email </p>
        <input />
        <p> phone </p>
        <input />
      </div>
      <div className="btn__register">
        <button>submit</button>
        <button>back</button>
      </div>
    </div>
  );
};

export default Register;
