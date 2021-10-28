import React, { useState, useEffect } from 'react';
import '../css/App.css';
import axios from "axios";
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';

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

const App = (props) => {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");

  const user = useSelector(selectUser);

  useEffect(() => {
    checkLoginStatus();
  });

  const checkLoginStatus = () => {
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
          setLoggedInStatus(true);
        } else {
          setLoggedInStatus(false);
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }

  const handleSuccessfulAuth = (data) => {
    localStorage.setItem("token", data.user.token);
    setLoggedInStatus(true);
  }

  const handleFleshmessage = (message) => {
    setFlashMessage(message);
    sleep(function(){
      setFlashMessage("");
    });
  }

  function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function sleep(fn, ...args) {
      await timeout(3000);
      return fn(...args);
  }

  const handleLogout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('userEmail', '');

    setLoggedInStatus(false);
    window.location.href = '/';
  }

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          loggedInStatus ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>  
      <CssBaseline />
      <div className="App">
      <Topmenu loggedInStatus={loggedInStatus} handleLogout={handleLogout} />
      <FlashMessage flashMessage={flashMessage} />
      <main className="px-3">
        <Switch>
        <Route exact path="/drives">
          <Drives />
        </Route>
          <Route path="/register">
            {loggedInStatus === false 
            ? <Register /> 
            : <Redirect to="/home" />}
          </Route>
          <Route path="/login">
            {loggedInStatus === false 
            ? <Login handleFleshmessage={handleFleshmessage} handleSuccessfulAuth={handleSuccessfulAuth} /> 
            : <Redirect to="/home" />}
          </Route>
          <Route path="/driver">
            <Driver />
          </Route>
          <Route path="/home">
            {loggedInStatus === true 
            ? <Home /> 
            : <Redirect to="/" />}
          </Route> 
          <Route path="/hitchhiker">
            {loggedInStatus === true 
            ? <Hitchhiker />
            : <Redirect to="/" />} 
          </Route>
          
          <Route path="/">
            {loggedInStatus === false 
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

export default App;
