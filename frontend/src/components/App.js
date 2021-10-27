import React, { Component } from 'react';
import '../css/App.css';
import axios from "axios";
import CssBaseline from '@mui/material/CssBaseline';

import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Drives from './pages/Drives';
import Hitchhiker from './pages/Hitchhiker';
import Driver from './pages/Driver';
import Register from './pages/Register';
import Home from './pages/Home';
import Topmenu from './Topmenu';
import FlashMessage from './Flashmessage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const theme = createTheme({palette: {
  mode: 'dark',
},});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: false,
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.checkLoginStatus();
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
    localStorage.setItem("token", data.data.user.token);
    
    this.setState({
      loggedInStatus: true
    });
  }

  handleLogout() {
    localStorage.setItem('token', '');
    localStorage.setItem('userEmail', '');

    this.setState({
      loggedInStatus: false
    });

    window.location.href = '/';
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>  
        <CssBaseline />
        <div className="App">
        <Topmenu />
        <FlashMessage />
        <main className="px-3">
          <Switch>
          <Route exact path="/drives">
            <Drives />
          </Route>
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
              ? <Home /> 
              : <Redirect to="/" />}
            </Route>
            <Route path="/driver">
              {this.state.loggedInStatus === true 
              ? <Driver />
              : <Redirect to="/" />}
            </Route>
            <Route path="/hitchhiker">
              {this.state.loggedInStatus === true 
              ? <Hitchhiker />
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
      </ThemeProvider>
      </Router>
    );
  }
}

export default App;
