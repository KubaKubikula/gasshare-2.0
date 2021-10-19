import React, { Component } from 'react';
import '../css/App.css';
import axios from "axios";

import Login from './Login';
import Homepage from './Homepage';
import Drives from './Drives';
import Hitchhiker from './Hitchhiker';
import Driver from './Driver';
import Register from './Register';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { 'token' : localStorage.getItem('token') }
    };

    axios
      .post("http://127.0.0.1:8000/loggedin/", requestOptions)
      .then(response => {
        if (
          response.loggedIn === "true" &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.user
          });
        } else if (
          !response.loggedIn &
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }

  handleSuccessfulAuth(data) {
    this.handleLogin(data);
    //this.history.push("/dashboard");
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        this.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }

  handleLogin(data) {
    console.log(data);
    localStorage.setItem("token", data.data.user.token);
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  render() {
    return (
      <Router>  
        <div className="App">
        <header className="mb-auto">
          <div>
            <Link to="/"><h3 style={{color:'white'}} className="float-md-start mb-0">GasShare</h3></Link>
            <nav className="nav nav-masthead justify-content-center float-md-end">
              <NavLink to="/" exact={true} activeClassName='nav-link active' className="nav-link">Home</NavLink>
              <NavLink to="/login" activeClassName='nav-link active' className="nav-link">Login</NavLink>
              <NavLink to="/learn" activeClassName='nav-link active' className="nav-link">Learn more</NavLink>
            </nav>
          </div>
        </header>
        <main className="px-3">
          <Switch>
          <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login history={this.props.history} handleSuccessfulAuth={this.handleSuccessfulAuth} />
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
          <Link className="btn btn-primary" to="/driver">
            Car
          </Link>
          <br /><br />
          <Link className="btn btn-primary"  to="/hitchhiker">
            Gas Money
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
