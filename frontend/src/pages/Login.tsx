import axios from "axios";
import { API_URL } from "../config/const";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { GoogleLogin } from 'react-google-login';
import Copyright from '../components/Copyright';

const Login = (props:any) =>  {
  const handleSubmit = (event:any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        email: data.get('email'),
        password: data.get('password')
      }
    };

    axios
      .post(API_URL + "login/", requestOptions)
      .then(response => {
        console.log(response.data);
        props.handleSuccessfulAuth(response.data);
        
      })
      .catch(error => {
        props.handleFleshmessage("Email or password doesn't match");
      });
  };

  const responseGoogle = (response:any) => {
    console.log(response);
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        data: response,
      }
    };
    console.log(requestOptions);

    axios
      .post(API_URL + "googlelogin/", requestOptions)
      .then(response => {
        console.log(response.data);
        props.handleSuccessfulAuth(response.data);
        
      })
      .catch(error => {
        props.handleFleshmessage("Email or password doesn't match");
      });

      console.log(response);
  }

  const responseGoogleFailure = (response:any) => {
    alert("bad login");
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{ 
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <GoogleLogin
              clientId="223666799897-gd0ne1hr1ui05n57o4pp9384055q9mjd.apps.googleusercontent.com"
              render={renderProps => (
                <Button 
                  type="button"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={renderProps.onClick} 
                  disabled={renderProps.disabled}
                >Google login</Button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogleFailure}
              cookiePolicy={'single_host_origin'}
            />
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}

export default Login;
