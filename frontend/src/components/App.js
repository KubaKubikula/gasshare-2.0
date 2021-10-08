import React, { Component } from 'react';
import logo from '../img/logo.png';
import '../css/App.css';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

class App extends Component {
  render() {
    const responseGoogle = (response) => {
      console.log(response);
    }
    const responseFacebook = (response) => {
      console.log(response);
    }
    return (
      <Router>  
        <div className="App">
        <header class="mb-auto">
          <div>
            <h3 class="float-md-start mb-0">GasShare</h3>
            <nav class="nav nav-masthead justify-content-center float-md-end">
              <NavLink to="/" activeClassName='nav-link active' className="nav-link">Home</NavLink>
              <NavLink to="/login" activeClassName='nav-link active' className="nav-link">Login</NavLink>
              <NavLink to="/learn" activeClassName='nav-link active' className="nav-link">Learn more</NavLink>
            </nav>
          </div>
        </header>
        <main class="px-3">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/learn">
              <Learn />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/driver">
              <Driver />
            </Route>
            <Route path="/hitchhiker">
              <Hitchhiker />
            </Route>
            <Route path="/drives">
              <Drives />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </main> 
        
      </div>
      </Router>
    );

    function Homepage() {
      return (
        <div>
          <br /><br />
          <br /><br />
          <h1>Find your drive and share a gas spendings.</h1>
          <p class="lead">Simply if you are driving from place to place or hitchhiking and want to share you ride/gas money</p>
          <p class="lead">
            <Link to="/login">
            <a href="#" class="btn btn-lg btn-secondary fw-bold border-white bg-white">Start with login</a><br /><br />
            </Link>
            <Link to="/learn">
            <a href="#" class="btn btn-lg btn-secondary fw-bold border-white bg-white">Learn more</a>
            </Link>
          </p>
          
          <br /><br />
          <br /><br />
          <br /><br />
        </div>
      );
    }
    
    function Login() {
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

    function Home() {
      return (
        <div>
          <br /><br />
          <br /><br />
          <h2>I have</h2>
          <div>
          <Link to="/driver">
            <input className="btn btn-primary" type="button" value="Car" />
          </Link>
          <br /><br />
          <Link to="/hitchhiker">
            <input className="btn btn-primary" type="button" value="Gas Money" />
          </Link>
          </div>
          <br /><br />
          <br /><br />
        </div>
      );
    }
    
    function Driver() {
      return ( 
        <div>
          <br /><br />
          <br /><br />
        <h2>Where are you going ?</h2>
          <DriverForm />
          <br /><br />
          <br /><br />
        </div>
      );
    }

    function Hitchhiker() {
      return ( 
        <div>
          <br /><br />
          <br /><br />
        <h2>Where are you going ?</h2>
          <input type="text" value="From address" />
          <br />
          <input type="text" value="Address" />
          <br />
          <input type="text" value="Time" />
          <br />
          <input class="btn btn-primary" type="button" value="Submit" />
          <br /><br />
          <br /><br />
        </div>
      );
    }

    function Drives() {
      return ( 
        <div>
        <h2>Drives</h2>
          <table>
            <tr>
              <td>Lisabon - Porto</td>
              <td>10am</td>
              <td>Knight rider</td>
            </tr>
          </table>
        </div>
      );
    }

    function Learn() {
      return ( 
        <div>
        <h2>Learn</h2>
          some description how to use it
        </div>
      );
    }
  }
}

class DriverForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {from: '', to: '', when: ''};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "from") {
      this.setState({from: event.target.value});
    }

    if (event.target.name === "to") {
      this.setState({to: event.target.value});
    }

    if (event.target.name === "when") {
      this.setState({when: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: this.state.from, to: this.state.to, when: this.state.when })
    };

    fetch('http://localhost:8000/drives/', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
    }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <table style={{display: 'block', width: '100px', margin: '0px auto'}}>
        <tbody>
          <tr>
            <td>
            From:
            </td>
            <td>
              <input type="text" name="from" value={this.state.from} onChange={this.handleChange} /> Insert my location
            </td>
          </tr>
          <tr>
            <td>
            To:
            </td>
            <td>
              <input type="text" name="to" value={this.state.to} onChange={this.handleChange} />
            </td>
          </tr>
          <tr>
            <td>
            When:
            </td>
            <td>
              <input type="text" name="when" value={this.state.when} onChange={this.handleChange} />
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

class LoginForm extends React.Component {
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

export default App;