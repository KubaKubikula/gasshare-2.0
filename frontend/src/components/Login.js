import React, { Component } from 'react';
import '../css/App.css';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import {
    Redirect
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
            <FacebookLogin
              appId="1088597931155576"
              autoLoad
              callback={responseFacebook}
              render={renderProps => (
                <button onClick={renderProps.onClick}>This is my custom FB button</button>
              )}
            />
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
        this.state = {email: '', password: '', xxclass: ''};
        
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChangePass(event)
    {
        this.setState({xxclass: 'password'});
    }

    handleChange(event) {
        if (event.target.email === "email") {
            this.setState({email: event.target.value});
        }

        if (event.target.password === "password") {
            this.setState({password: event.target.value});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        alert("cosik");
        <Redirect to="/home"/>;
        // const requestOptions = {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ from: this.state.email, to: this.state.password})
        // };

        // fetch('http://localhost:8000/login/', requestOptions)
        //     .then(response => response.json())
        //     .then(data => this.setState({ postId: data.id }));
    }

    render() {
        return (
        <div>
        
        <div class="owl">
        <div class="hand"></div>
        <div class="hand hand-r"></div>
        <div class="arms">
            <div class="arm"></div>
            <div class="arm arm-r"></div>
        </div>
        </div>
        <div class="form">
        <div class="control">
            <label for="email" class="fa fa-envelope"></label>
            <input id="email" placeholder="Email" type="email"></input>
        </div>
        <div class="control">
        <label for="password" class="fa fa-asterisk"></label>
        <input class={this.state.xxclass} onChange={this.handleChangePass} id="password" placeholder="Password" type="password" />
        </div>
        </div>
        
        <main style={{display: 'none'}} class="form-signin">
        <form>
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
            <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
            <label for="floatingPassword">Password</label>
            </div>

            <div class="checkbox mb-3">
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
        </main>
    
        <form style={{display: 'none'}} onSubmit={this.handleSubmit}>
            <table style={{display: 'block', width: '100px', margin: '0px auto'}}>
            <tbody>
            <tr>
                <td>
                Email:
                </td>
                <td>
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                </td>
            </tr>
            <tr>
                <td>
                Password:
                </td>
                <td>
                <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                </td>
            </tr>
            </tbody>
            </table>
            <input type="submit" value="Submit" />
        </form>
        </div>
        );
    }
}

export default Login;