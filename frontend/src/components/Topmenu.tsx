import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  drawer: {
    width: 250
  },
  paper: {
    background: 'black',
    color: 'white'
  }
});

const Topmenu = (props:any) => {
    const menuId = 'primary-search-account-menu';

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const classes = useStyles();

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event:any) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event:any) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const AvatarImage:any = () => {
        console.log(localStorage.getItem("avatar_url"));
        return (
          localStorage.getItem("avatar_url")
          ? <Avatar alt="Jakub Zientek" src={localStorage.getItem("avatar_url")!} />
          : <AccountCircle />
        );
    }

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AvatarImage />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }} >
        <AppBar position="relative" style={{ opacity : '95%'}}>
        <Toolbar>
          {localStorage.getItem("LoggedIn") === "true" ? 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} classes={{ paper: classes.paper }}>
            <List className={classes.drawer}>
              <ListItem button>
                <Link style={{ textDecoration: 'none'}} to="/home"><ListItemText primary="New drive" /></Link>
              </ListItem>

              <ListItem button>
                <Link style={{ textDecoration: 'none'}} to="/drives"><ListItemText primary="Drives" /></Link>
              </ListItem>
            </List>
          </Drawer>
          </Typography> : <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link style={{ textDecoration: 'none',  color: 'white' }} to="/">Gasshare</Link>
          </Typography>}
          {localStorage.getItem("LoggedIn") === "true" ? 
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="success">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AvatarImage />
            </IconButton>
          </Box> : <span></span>}
         {localStorage.getItem("LoggedIn") === "true" ? 
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
              
            </IconButton>
          </Box> : <span></span>}
          {localStorage.getItem("LoggedIn") !== "true"
          ? <Button href="/login" color="inherit">Login</Button>
          : <span></span>}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    );
}

export default Topmenu;