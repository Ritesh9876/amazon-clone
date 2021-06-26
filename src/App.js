import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Checkout from './components/Checkout'
function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header/>  
            <Home/>
            </Route>
            <Route path="/checkout">
            <Header/>
            <Checkout/>
            </Route>
            <Route path="/login">
            <Header/> 
              <h1>logout</h1>
            </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
