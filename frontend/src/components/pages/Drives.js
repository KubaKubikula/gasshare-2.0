import React, { Component } from 'react';
import '../../css/App.css';




class Drives extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            drives : []
        }
    }

    componentDidMount() {
        this.state.drives = this.getDrives();
    }

    getDrives() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
            };
        
        fetch('http://localhost:8000/drives/', requestOptions)
            .then(response => {
                console.log(response);
                return response;
        }) 
    }    

    render() {   
        return <div>{this.state.drives}</div>  
    }
}

export default Drives;