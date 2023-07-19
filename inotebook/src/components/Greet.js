import React from "react";
import { Link } from "react-router-dom";

const Greet = (props) => {
  return (
    <>
      <div
        className="container px-2 py-1 rounded-3 mt-5 shadow p-3 mb-5"
        style={{ background: "#7b23b9" , width:'40rem'}}
      >
        <div className="container px-3 py-3" style={{ background: "#f46bce" }}>
          <h1>Welcome To iNotebook!</h1>
          <h2>Make your own notes diary.</h2>
          <h3>One stop for all personal notes.</h3>
          <h4>
            100% Secured! So that no one can peek into your personal notes
          </h4>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <form className="d-flex ">
          <Link
            to="/login"
            className="btn btn-warning px-5 mx-2 rounded-2"
            role="button"
          >
            Login
          </Link>
          <Link to="/signup" className="btn btn-warning rounded-2 px-5" role="button">
            SignUp
          </Link>
        </form>
      </div>
    </>
  );
};

export default Greet;
