import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
function App() {
  return (
    <Router>
      <div className="app">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
            <Route
              path="/checkout"
              element={
                <>
                  <Header />
                  <Checkout />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Header />
                  <Signup/>
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Header />
                  <Login/>
                </>
              }
            />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
