import React, { Component } from 'react';
import '../../css/App.css';

class Hitchhiker extends Component {
    render() {
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
}

export default Hitchhiker;