import React, { Component } from 'react';
import logo from '../img/logo.png';
import '../css/App.css';
import { GoogleLogin } from 'react-google-login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  render() {
    const responseGoogle = (response) => {
      console.log(response);
    }
    return (
      <Router>  
      <div className="App">
          <header className="App-header">
            <img className="App-logo" src={logo} alt="logo" />
            <h1 className="App-title">It's time to share your car/gasmoney</h1>
          </header>
        <br /><br />
        <Switch>
          <Route path="/login">
            <Login />
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
        </Switch>
      </div>
      </Router>
    );
    
    function Login() {
      return (
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      );
    }

    function Home() {
      return (
        <div>
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
        </div>
      );
    }
    
    function Driver() {
      return ( 
        <div>
        <h2>Where are you going ?</h2>
          <DriverForm />
        </div>
      );
    }

    function Hitchhiker() {
      return ( 
        <div>
        <h2>Where are you going ?</h2>
          <input type="text" value="From address" />
          <br />
          <input type="text" value="Address" />
          <br />
          <input type="text" value="Time" />
          <br />
          <input class="btn btn-primary" type="button" value="Submit" />
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

export default App;