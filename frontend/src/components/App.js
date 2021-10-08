import React, { Component, useState } from 'react';
import '../css/App.css';

import Login from './Login';
import Homepage from './Homepage';
import Drives from './Drives';
import Hitchhiker from './Hitchhiker';
import Driver from './Driver';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

class App extends Component {
  
  render() {
    if(false) {
      alert("xxxx");
    }
    return (
      <Router>  
        <div className="App">
        <header class="mb-auto">
          <div>
            <Link to="/"><h3 style={{color:'white'}} class="float-md-start mb-0">GasShare</h3></Link>
            <nav class="nav nav-masthead justify-content-center float-md-end">
              <NavLink to="/" activeClassName='nav-link active' className="nav-link">Home</NavLink>
              <NavLink to="/login" activeClassName='nav-link active' className="nav-link">Login</NavLink>
              <NavLink to="/learn" activeClassName='nav-link active' className="nav-link">Learn more</NavLink>
            </nav>
          </div>
        </header>
        <main class="px-3">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/learn">
              <Learn />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/driver">
              <Driver />
            </Route>
            <Route path="/hitchhiker">
              <Hitchhiker />
            </Route>
            <Route path="/drives">
              <Drives />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </main> 
        <br /><br /><br /><br /><br />
      </div>
      </Router>
    );

    function Home() {
      return (
        <div>
          <br /><br />
          <br /><br />
          <h2>I have</h2>
          <div>
          <Link to="/driver">
            <input className="btn btn-primary" type="button" value="Car" />
          </Link>
          <br /><br />
          <Link to="/hitchhiker">
            <input className="btn btn-primary" type="button" value="Gas Money" />
          </Link>
          </div>
          <br /><br />
          <br /><br />
        </div>
      );
    }


    function Learn() {
      return ( 
        <div>
        <h2>Learn</h2>
          some description how to use it
        </div>
      );
    }
  }
}

export default App;