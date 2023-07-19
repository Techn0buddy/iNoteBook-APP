/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem('token');
    navigate('/login');
    
  }
    return (
      <>
        <nav
          className="navbar navbar-expand-lg navbar-dark fixed-top"
          style={{ background: "rgb(0 163 185)" }}
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              iNotebook
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/about" ? "active" : ""
                    }`}
                    to="/about"
                  >
                    About
                  </Link>
                </li>
              </ul>
              {!localStorage.getItem("token") ? (
                <form className="d-flex">
                  <Link
                    to="/login"
                    className="btn btn-dark mx-2 rounded-2"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-dark rounded-2"
                    role="button"
                  >
                    SignUp
                  </Link>
                </form>
              ) : (
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      </>
    );
};

export default Navbar;
