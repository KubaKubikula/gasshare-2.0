import React, { Component } from 'react';
import '../css/App.css';
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
          <div>
            <br /><br />
            <br /><br />
            <h2>I have</h2>
            <div>
            <Link className="btn btn-primary" to="/driver">
              Car
            </Link>
            <br /><br />
            <Link className="btn btn-primary"  to="/hitchhiker">
              Gas Money
            </Link>
            </div>
            <br /><br />
            <br /><br />
          </div>
        );
      }
}

export default Home;