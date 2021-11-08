import axios from "axios";
import { API_URL } from "../config/const";
import * as React from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const Home = (props:any) => {
    const handleSubmit = (event:any) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      
      console.log({
        drive_from: data.get('from'),
        drive_to: data.get('to'),
        time: data.get('when'),
        hitchhike: false,
        user: 2
      });

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          drive_from: data.get('from'),
          drive_to: data.get('to'),
          time: data.get('when'),
          hitchhike: false,
          user: 2
        }
      };

      axios
        .post(API_URL + "drives/", requestOptions)
        .then(response => {
          console.log(response.data);
          window.location.href = '/drives';
        })
        .catch(error => {
          console.log("check login error", error);
        });
    };
    
    const [value, setValue] = React.useState(new Date());
    
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
        <Typography component="h1" variant="h5">
          Where are you going ?
        </Typography>
        <br /><br />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={value}
            onChange={(newValue:any) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
          <TextField
            margin="normal"
            required
            fullWidth
            id="from"
            label="From place"
            name="from"
            autoComplete="from"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="to"
            label="To place"
            name="to"
            autoComplete="to"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
    );
}

export default Home;