import React from 'react';
import '../../css/App.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Homepage = (props) => {
    return (
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
            <Container maxWidth="sm">
                <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                >
                Find your drive and share a gas spendings.
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Simply if you are driving from place to place or hitchhiking and want to share you ride/gas money
                </Typography>
                <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
                >
                <Button variant="contained" href="/login">Start with login</Button>
                <Button variant="contained" href="/learn">Learn more</Button>
                </Stack>
            </Container>
          </Box>
    );
}

export default Homepage;