import React, { Component, useState, useEffect } from 'react';
import '../../css/App.css';
import axios from "axios";
import {
    Link
} from "react-router-dom";

const Drives = (props) => {
    const [drives, setDrives] = useState([]);
    useEffect(() => {
        getDrives();
    });

    function getDrives() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        axios
            .get(
                "http://127.0.0.1:8000/drives/",
                requestOptions
            )
            .then(data => {
                setDrives(data.data); 
            });
    }
    
    return (
        <div>
            {drives.map((drive) => {
                return <li>{drive.created}</li>
            })}
        </div>
    );
}

export default Drives;