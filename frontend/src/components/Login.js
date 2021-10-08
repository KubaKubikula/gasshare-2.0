import React, { Component } from 'react';
import '../css/App.css';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

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
            <br /><br />
            <LoginForm />
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
        this.state = {email: '', password: ''};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: this.state.email, to: this.state.password})
        };

        fetch('http://localhost:8000/login/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
        }

    render() {
        return (
        <div>
        <h3>Oldschool login</h3>
        <form onSubmit={this.handleSubmit}>
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