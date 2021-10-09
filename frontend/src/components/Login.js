import React, { Component, useState } from 'react';
import '../css/App.css';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';

import {
    Link
} from "react-router-dom";

class Login extends Component {
    render () {
        const responseGoogle = (response) => {
            console.log(response);
        }
        const responseFacebook = (response) => {
            console.log(response);
        }
        
        return (
          <div>
            <br /><br />
            <br /><br />
            <br /><br />
            <LoginForm />
            <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <br /><br />          
            <br />
            <br /><br />
            <br /><br />
          </div>
        );
      }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', passClass: ''};
        
        this.handleFocusPass = this.handleFocusPass.bind(this);
        this.handleBlurPass = this.handleBlurPass.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleFocusPass(event)
    {
        this.setState({passClass: 'password'});
    }

    handleBlurPass(event)
    {
        this.setState({passClass: ''});
    }

    handleChange(event) {
        if (event.target.id === "email") {
            this.setState({email: event.target.value});
        }

        if (event.target.id === "password") {
            this.setState({password: event.target.value});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        
        // const requestOptions = {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ from: this.state.email, to: this.state.password})
        // };

        // fetch('http://localhost:8000/login/', requestOptions)
        //     .then(response => response.json())
        //     .then(data => this.setState({ postId: data.id }));

        // <FacebookLogin
        //       appId="1088597931155576"
        //       autoLoad
        //       callback={responseFacebook}
        //       render={renderProps => (
        //         <button >This is my custom FB button</button>
        //       )}
        //     />  
    }

    render() {
        return (
        <div>
            <div className="owl">
            <div className={`hand ${this.state.passClass}`}></div>
            <div className={`hand hand-r ${this.state.passClass}`}></div>
            <div className={`arms ${this.state.passClass} `}>
                <div className={`arm ${this.state.passClass} `}></div>
                <div className={`arm arm-r ${this.state.passClass} `}></div>
            </div>
            </div>
            <form onSubmit={this.handleSubmit}>
                <div className="form">
                    <div className="control">
                        <label htmlFor="email" className="fa fa-envelope"></label>
                        <input id="email" placeholder="Email" type="email" value={this.state.email} onChange={this.handleChange}></input>
                    </div>
                    <div className="control">
                        <label htmlFor="password" className="fa fa-asterisk"></label>
                        <input value={this.state.password} onChange={this.handleChange}  onBlur={this.handleBlurPass} onFocus={this.handleFocusPass} id="password" placeholder="Password" type="password" />
                    </div>
                    <input className="btn btn-primary" type="submit" value="Log me in" />
                </div>
            </form>
            <Link to="/register">Create account</Link>
            <br /><br />
        </div>
        );
    }
}

export default Login;