import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Drives from './pages/Drives';
import Register from './pages/Register';
import Home from './pages/Home';
import Chat from './pages/Chatt';
import Topmenu from './components/Topmenu';
import FlashMessage from './components/Flashmessage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

const theme = createTheme({palette: {
  mode: 'dark',
},});

const App = () => {
  const [flashMessage, setFlashMessage] = useState("");

  const handleSuccessfulAuth = (data:any) => {
    localStorage.setItem("token", data.user.token);
    localStorage.setItem("avatar_url", data.user.avatar);
    localStorage.setItem("user_id", data.user.id);
    localStorage.setItem("LoggedIn", "true");
    window.location.href = '/home';
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
    localStorage.setItem("LoggedIn", "false");
    localStorage.setItem("avatar_url", "");
    localStorage.setItem("user_id", "");
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
          <PublicRoute path="/login">
            <Login handleFleshmessage={handleFleshmessage} handleSuccessfulAuth={handleSuccessfulAuth} /> 
          </PublicRoute>
          <PublicRoute path="/register"> 
            <Register handleFleshmessage={handleFleshmessage} handleSuccessfulAuth={handleSuccessfulAuth}/> 
          </PublicRoute>
          <PublicRoute exact path="/">
            <Homepage />
          </PublicRoute>
          <PrivateRoute path="/chat/:driveId" component={Chat} />
          <PrivateRoute exact path="/drives">
            <Drives />
          </PrivateRoute>
          <PrivateRoute path="/home">
            <Home /> 
          </PrivateRoute> 
        </Switch>
      </main> 
      
      <br /><br /><br /><br /><br />
    </div>
    </ThemeProvider>
    </Router>
  );
}

export default App;
