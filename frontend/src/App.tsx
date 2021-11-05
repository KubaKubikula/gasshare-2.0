import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Drives from './pages/Drives';
import Hitchhiker from './pages/Hitchhiker';
import Driver from './pages/Driver';
import Register from './pages/Register';
import Home from './pages/Home';
import Chat from './pages/Chatt';
import Topmenu from './components/Topmenu';
import FlashMessage from './components/Flashmessage';
import PrivateRoute from './components/PrivateRoute';
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

const App = (props:any) => {
  const [flashMessage, setFlashMessage] = useState("");

  const handleSuccessfulAuth = (data:any) => {
    localStorage.setItem("token", data.user.token);
    localStorage.setItem("LoggedIn", "true");
  }

  const handleFleshmessage = (message:string) => {
    setFlashMessage(message);
    sleep(function(){
      setFlashMessage("");
    });
  }

  function timeout(ms:any) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function sleep(fn:any, ...args:any[]) {
      await timeout(3000);
      return fn(...args);
  }

  const handleLogout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('userEmail', '');
    localStorage.setItem("LoggedIn", "false");
    window.location.href = '/';
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>  
      <CssBaseline />
      <div className="App">
      <Topmenu handleLogout={handleLogout} />
      <FlashMessage flashMessage={flashMessage} />
      <main className="px-3">
        <Switch>
        <PrivateRoute path="/chat">
          <Chat />
        </PrivateRoute>
        <PrivateRoute exact path="/drives">
          <Drives />
        </PrivateRoute>
          <Route path="/register"> 
            <Register handleFleshmessage={handleFleshmessage} handleSuccessfulAuth={handleSuccessfulAuth}/> 
          </Route>
          <Route path="/login">
            <Login handleFleshmessage={handleFleshmessage} handleSuccessfulAuth={handleSuccessfulAuth} /> 
          </Route>
          <PrivateRoute path="/driver">
            <Driver />
          </PrivateRoute>
          <PrivateRoute path="/home">
            <Home /> 
          </PrivateRoute> 
          <PrivateRoute path="/hitchhiker">
            <Hitchhiker />
          </PrivateRoute>
          <Route path="/">
            <Homepage />
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
