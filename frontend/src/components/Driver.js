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
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: this.state.from, to: this.state.to, when: this.state.when })
      };

      fetch('http://localhost:8000/drives/', requestOptions)
          .then(response => response.json())
          .then(data => this.setState({ postId: data.id }));

      event.preventDefault();
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