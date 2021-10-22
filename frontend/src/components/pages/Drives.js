import React, { Component } from 'react';
import '../../css/App.css';




class Drives extends Component {
    
    constructor(props) {
        super(props);
    }

    async getDrives() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
            };
        
        fetch('http://localhost:8000/drives/', requestOptions)
            .then(response => {
                return response;
        }) 

       return '{}';
    }    

    

    render() {
        return this.getDrives().then(response => {
            var arr = [];
            Object.keys(response).forEach(function(key) {
                arr.push(response[key]);
            });
            return <ul>{arr.map(item => <MyAppChild key={item.label} label={item.label} value={item.value} />)}</ul>;
        });   
    }
}
class MyAppChild extends React.Component {
    render() {
        return <li>{this.props.label + " - " + this.props.value}</li>;
    }
}

export default Drives;