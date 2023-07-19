import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      return props.showAlert(
        "Password didn't match. Re-enter password.",
        "warning"
      );
    }
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    //Storing the auth-token and redirect to home page.
    if (json.success) {
      setCredentials({ name: "", password: "", email: "" });
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Account created successfully.", "success");
    } else {
      props.showAlert(json.error, "primary");
    }
  };

  return (
    <div
      className="container col-sm-6 px-3 py-4 rounded-3 mt-5 shadow p-3 mb-5"
      style={{ background: "#00ffb3" }}
    > 
      <h2 className="text-center" style={{cursor: 'default'}}>SignUp</h2>
      <form onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            <strong>Name</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="eg- John"
            value={credentials.name}
            onChange={onchange}
            required
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            <strong>Confirm Password</strong>
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            placeholder="re-enter password"
            value={credentials.cpassword}
            onChange={onchange}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-warning px-4">
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
