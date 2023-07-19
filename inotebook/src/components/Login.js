import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Login Successfull", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  return (
    <div
      className="container col-sm-6 px-3 py-4 rounded-3 mt-5 shadow p-3 mb-5"
      style={{ background: "#00ffb3" }}
    >
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="eg- abc@gmail.com"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onchange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="enter password"
            value={credentials.password}
            onChange={onchange}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-warning px-4">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
