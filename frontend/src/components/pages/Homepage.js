import React, { Component } from 'react';
import '../../css/App.css';
import Button from '@mui/material/Button';

const Homepage = (props) => {
    return (
        <div style={{marginTop: "150px"}}>
            <h1>Find your drive and share a gas spendings.</h1>
            <br />
            <p className="lead">Simply if you are driving from place to place or hitchhiking<br /> and want to share you ride/gas money</p>
            <br /><br />
            <p className="lead">
                <Button variant="contained" href="/login">Start with login</Button>
                <br /><br />
                <Button variant="contained" href="/learn">Learn more</Button>
            </p>
        </div>
    );
}

export default Homepage;