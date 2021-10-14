import React, { Component } from 'react';
import '../css/App.css';
import { Link } from "react-router-dom";

class Homepage extends Component {
    render () {
        return (
            <div>
            <br /><br />
            <br /><br />
            <br /><br />
            <h1>Find your drive and share a gas spendings.</h1>
            <br />
            <p className="lead">Simply if you are driving from place to place or hitchhiking<br /> and want to share you ride/gas money</p>
            <br /><br />
            <p className="lead">
                <Link to="/login">
                <a href="#" className="btn btn-lg btn-secondary fw-bold border-white bg-white">Start with login</a><br /><br />
                </Link>
                <Link to="/learn">
                <a href="#" className="btn btn-lg btn-secondary fw-bold border-white bg-white">Learn more</a>
                </Link>
            </p>
            
            <br /><br />
            <br /><br />
            <br /><br />
            </div>
        );
    }
}

export default Homepage;