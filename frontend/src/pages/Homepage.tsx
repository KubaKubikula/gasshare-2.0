import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './Homepage.css';

const Homepage = (props:any) => {
    return (
        <Box
          sx={{
            bgcolor: 'none',
            pt: 8,
            pb: 6,
          }}
        > 
          <video id="background-video" autoPlay loop muted>
              <source src="./car.mp4" type='video/mp4' />
          </video>
            <Container maxWidth="sm">
                <Typography style={{ fontWeight: 'bold' }}
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                >
                Find your drive and share a gas spendings.
                </Typography>
                <Typography style={{ fontWeight: 'bold' , color: 'white' }} variant="h5" align="center" color="text.secondary" paragraph>
                    Simply if you are driving from place to place or hitchhiking and want to share you ride/gas money
                </Typography>
                <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
                >
                <Button variant="contained" href="/login">Start with login</Button>
                </Stack>
            </Container>
          </Box>
    );
}

export default Homepage;