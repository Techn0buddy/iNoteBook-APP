import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  // Link,
  // useParams,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Greet from "./components/Greet";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({
      message: msg,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={ alert} />
          <div className="container">
            <Routes>
              
              <Route
                exact
                path="/greet"
                element={<Greet showAlert={showAlert} />}
              ></Route>
              <Route
                exact
                path="/"
                element={<Home showAlert={showAlert} />}
              ></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              ></Route>
              <Route
                exact
                path="/signup"
                element={<SignUp showAlert={showAlert} />}
              ></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
