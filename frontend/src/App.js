import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import { auth } from "./components/Firebase/firebase";
import { useStateValue } from "./components/StateProvider";
import PaymentPage from "./components/Payments";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders";
const promise = loadStripe(
  `${process.env.REACT_APP_STRIPE_KEY}`
  );
function App() {
  const [{},dispatch]=useStateValue();

  useEffect(() => {

    auth.onAuthStateChanged((authUser) => {

      if (authUser) {

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
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
            <Route
              path="/payment"
              element={
                <>
                  <Header />
                  <Elements stripe={promise}>
                  <PaymentPage/>
                  </Elements>
                </>
              }
            />
            <Route
              path="/orders"
              element={
                <>
                  <Header />
                  <Orders/>
                </>
              }
            />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
