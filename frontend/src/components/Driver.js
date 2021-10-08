import React, { Component } from 'react';
import '../css/App.css';

class Driver extends Component {
    render () { return (
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

  export default Driver;