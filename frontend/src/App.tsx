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
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");

  //const user = useSelector(selectUser);

  useEffect(() => {
    console.log("constructor");
    console.log(loggedInStatus);
  });

  const handleSuccessfulAuth = (data:any) => {
    localStorage.setItem("token", data.user.token);
    setLoggedInStatus(true);
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

    setLoggedInStatus(false);
    window.location.href = '/';
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
        <PrivateRoute path="/chat">
          <Chat />
        </PrivateRoute>
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
