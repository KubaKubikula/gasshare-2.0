import React from 'react';
import '../css/App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const Topmenu = (props) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{ textDecoration: 'none',  color: 'white' }} to="/">Gasshare</Link>
          </Typography>
          {props.loggedInStatus == false 
          ? <Button href="/login" color="inherit">Login</Button>
          : <Button onClick={props.handleLogout} color="inherit">Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
    );
}

export default Topmenu;