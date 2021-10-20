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
  NavLink,
  Redirect
} from "react-router-dom";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: false,
      user: {}
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
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
          response.data.loggedIn === "true"
        ) {
          this.setState({
            loggedInStatus: true
          });
        } else {
          this.setState({
            loggedInStatus: false
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

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    localStorage.setItem('token', '');
    localStorage.setItem('userEmail', '');

    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });

    window.location.href = '/';
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
              {this.state.loggedInStatus === false
              ? <NavLink to="/login" activeClassName='nav-link active' className="nav-link">Login</NavLink>
              : <NavLink to="/user" activeClassName='nav-link active' className="nav-link">jakub.zient@gmail.com</NavLink> 
              }
              {this.state.loggedInStatus === true ?
              <a href="#" onClick={this.handleLogout}  activeClassName='nav-link active' className="nav-link">Logout</a>
              : ''}
            </nav>
          </div>
        </header>
        <main className="px-3">
          <Switch>
          <Route path="/register">
              {this.state.loggedInStatus === false 
              ? <Register /> 
              : <Redirect to="/home" />}
            </Route>
            <Route path="/login">
              {this.state.loggedInStatus === false 
              ? <Login history={this.props.history} handleSuccessfulAuth={this.handleSuccessfulAuth} /> 
              : <Redirect to="/home" />}
            </Route>
            <Route path="/home">
              {this.state.loggedInStatus === true 
              ?<Home /> 
              : <Redirect to="/" />}
            </Route>
            <Route path="/driver">
              {this.state.loggedInStatus === true 
              ?<Driver />
              : <Redirect to="/" />}
            </Route>
            <Route path="/hitchhiker">
              {this.state.loggedInStatus === true 
              ?<Hitchhiker />
              : <Redirect to="/" />} 
            </Route>
            <Route path="/drives">
              {this.state.loggedInStatus === true 
              ?<Drives />
              : <Redirect to="/" />}  
            </Route>
            <Route path="/">
              {this.state.loggedInStatus === false 
              ? <Homepage />
              : <Redirect to="/home" />}   
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
