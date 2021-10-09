import React, { Component } from 'react';
import '../css/App.css';

import {
    Redirect
} from "react-router-dom";

class Register extends Component {
    render () {
        return (
          <div>
            <br /><br />
            <br /><br />
            <br /><br />
            <RegisterForm />
            <br /><br />          
            <br />
            <br /><br />
            <br /><br />
          </div>
        );
      }
}

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            passClass: '',
            flashMessage: '',
            flashClass: 'd-none'
        };
        
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

        if (event.target.id === "password2") {
            this.setState({password2: event.target.value});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: this.state.email, 
                password: this.state.password, 
                password2: this.state.password2
            })
        };
        
        fetch('http://localhost:8000/register/', requestOptions)
            .catch((error) => {
                console.error('Error:', error);
            })
            .then(response => response.json())
            .then(data => {
                    console.log(data);
                    this.setState({flashMessage: Object.values(data)[0][0], flashClass: ''}) 
            });

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
            <div className={`${this.state.flashClass} alert alert-fixed alert-secondary`} role="alert">
                {this.state.flashMessage}
            </div>
            <div class="owl">
            <div className={`hand ${this.state.passClass}`}></div>
            <div className={`hand hand-r ${this.state.passClass}`}></div>
            <div className={`arms ${this.state.passClass} `}>
                <div className={`arm ${this.state.passClass} `}></div>
                <div className={`arm arm-r ${this.state.passClass} `}></div>
            </div>
            </div>
            <form onSubmit={this.handleSubmit}>
                <div class="form">
                    <div class="control">
                        <label for="email" class="fa fa-envelope"></label>
                        <input id="email" placeholder="Email" type="email" value={this.state.email} onChange={this.handleChange}></input>
                    </div>
                    <div class="control">
                        <label for="password" class="fa fa-asterisk"></label>
                        <input value={this.state.password} onChange={this.handleChange}  onBlur={this.handleBlurPass} onFocus={this.handleFocusPass} id="password" placeholder="Password" type="password" />
                    </div>
                    <div class="control">
                        <label for="password2" class="fa fa-asterisk"></label>
                        <input value={this.state.password2} onChange={this.handleChange}  onBlur={this.handleBlurPass} onFocus={this.handleFocusPass} id="password2" placeholder="Password again" type="password" />
                    </div>
                    <input class="btn btn-primary" type="submit" value="Register me" />
                </div>
            </form>
        </div>
        );
    }
}

export default Register;