import axios from "axios";
import React, { useContext, createContext, useState } from "react";

const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
};
  
  /** For more details on
   * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
   * refer to: https://usehooks.com/useAuth/
   */
  const authContext = createContext({});
  
  function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
      <authContext.Provider value={auth}>
        {children}
      </authContext.Provider>
    );
  }
  
  function useAuth() {
    return useContext(authContext);
  }
  
  function useProvideAuth() {
    const [user, setUser] = useState(null);
  
    const signin = cb => {
      return fakeAuth.signin(() => {
        setUser("user");
        cb();
      });
    };
  
    const signout = cb => {
      return fakeAuth.signout(() => {
        setUser(null);
        cb();
      });
    };
  
    return {
      user,
      signin,
      signout
    };
  }

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