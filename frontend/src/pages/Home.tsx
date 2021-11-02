import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Home = (props:any) => {
        return (
          <Box     
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm" >
            <div>
            <Button variant="contained" href="/driver">
              I am Driver
            </Button>
            <br /><br />
            <Button variant="contained" href="/hitchhiker">
              I am Hitchhiker
            </Button>
            </div>
          </Container>
          </Box>
        );
}

export default Home;