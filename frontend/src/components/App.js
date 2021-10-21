import React, { Component } from 'react';
import '../css/App.css';
import axios from "axios";

import Login from './Login';
import Homepage from './Homepage';
import Drives from './Drives';
import Hitchhiker from './Hitchhiker';
import Driver from './Driver';
import Register from './Register';
import Home from './Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";

function PrivateRoute({ component: Component, loggedIn : loggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, loggedIn : loggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

class App extends Component {

  constructor(props) {
    super(props);
  
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
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
          this.props.loggedInStatus = true;
        } else {
          this.props.loggedInStatus = false
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }


  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    localStorage.setItem('token', '');
    localStorage.setItem('userEmail', '');

    this.props.loggedInStatus = false;

    window.location.href = '/';
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
              {this.props.loggedInStatus === false
              ? <NavLink to="/login" activeClassName='nav-link active' className="nav-link">Login</NavLink>
              : <NavLink to="/user" activeClassName='nav-link active' className="nav-link">jakub.zient@gmail.com</NavLink> 
              }
              {this.props.loggedInStatus === true ?
              <a href="#" onClick={this.handleLogout}  activeClassName='nav-link active' className="nav-link">Logout</a>
              : ''}
            </nav>
          </div>
        </header>
        <main className="px-3">
          <Switch>
            <PublicRoute path="/register" component={Register} loggedIn={this.props.loggedInStatus} />
            <PublicRoute path="/login" component={Login} loggedIn={this.props.loggedInStatus} />
            <PublicRoute path="/" component={Homepage} loggedIn={this.props.loggedInStatus} />
            
            <PrivateRoute path="/home" component={Home} loggedIn={this.props.loggedInStatus} />
            <PrivateRoute path="/driver" component={Driver} loggedIn={this.props.loggedInStatus} />
            <PrivateRoute path="/hitchhiker" component={Hitchhiker} loggedIn={this.props.loggedInStatus} />
            <PrivateRoute path="/drives" component={Drives} loggedIn={this.props.loggedInStatus} />
          </Switch>
        </main> 
        <br /><br /><br /><br /><br />
      </div>
      </Router>
    );
  }
}

export default App;
