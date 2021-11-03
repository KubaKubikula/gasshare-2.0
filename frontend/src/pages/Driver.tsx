import axios from "axios";

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Driver = (props:any) => {
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
        .post("http://127.0.0.1:8000/drives/", requestOptions)
        .then(response => {
          console.log(response.data);
          window.location.href = '/drives';
        })
        .catch(error => {
          console.log("check login error", error);
        });
    };

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
          Where are you driving ?
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="when"
              label="When"
              name="when"
              autoComplete="when"
              autoFocus
            />
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

export default Driver;