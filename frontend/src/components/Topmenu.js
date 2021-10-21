import React, { Component } from 'react';
import '../css/App.css';

import {
    Link,
    NavLink,
} from "react-router-dom";

class Topmenu extends Component {
    render () { return (
        <header className="mb-auto">
            <div>
                <Link to="/"><h3 style={{color:'white'}} className="float-md-start mb-0">GasShare</h3></Link>
                <nav className="nav nav-masthead justify-content-center float-md-end">
                    <NavLink to="/" exact={true} activeClassName='nav-link active' className="nav-link">Home</NavLink>
                    {false === false
                    ? <NavLink to="/login" activeClassName='nav-link active' className="nav-link">Login</NavLink>
                    : <NavLink to="/user" activeClassName='nav-link active' className="nav-link">jakub.zient@gmail.com</NavLink> 
                    }
                    {true === true ?
                    <a href="#" onClick={this.handleLogout}  activeClassName='nav-link active' className="nav-link">Logout</a>
                    : ''}
                </nav>
            </div>
        </header>
    );
  }
}

export default Topmenu;