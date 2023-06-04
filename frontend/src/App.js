import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
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
              path="/login"
              element={
                <>
                  <Header />
                  <h1>logout</h1>
                </>
              }
            />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
