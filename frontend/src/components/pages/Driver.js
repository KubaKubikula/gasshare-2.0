import React, { Component } from 'react';
import '../../css/App.css';

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
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          drive_from: this.state.from, 
          drive_to : this.state.to, 
          time: this.state.when 
        })
      };
      
      event.preventDefault();

      fetch('http://localhost:8000/drives/', requestOptions)
          .then(response => {
            window.location.href = '/drives'; 
          })

      
    }
  
    render() {
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <input type="text" class="form-control" name="from"  id="from" placeholder="from" value={this.state.from} onChange={this.handleChange} />
          </div>
          <div class="form-group">
            <input type="text" class="form-control" name="to" id="to" placeholder="to" value={this.state.to} onChange={this.handleChange} />
          </div>
          <div class="form-group">
            <input type="text" class="form-control" name="when" id="when" placeholder="when" value={this.state.when} onChange={this.handleChange} />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
      );
    }
  }

  export default Driver;