import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";

const checkLoginStatus = async () => {
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
          return true;
      } else {
          return false
      }
      })
      .catch(error => {
      console.log("check login error", error);
  });
}

checkLoginStatus().then(function() {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
