import React from 'react';
import { Button, Typography, Container, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePageComponent = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', ml:3 }}>
      <Paper elevation={3} sx={{ p: 4, my: 4, mx: 2, maxWidth: '600px', textAlign: 'center', height: 'auto'}}>
        <Typography variant="h4" gutterBottom>
          Welcome to Your ToDoList App
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Stay on top of your tasks and boost productivity with our intuitive ToDoList app.
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Organize your day, set priorities, and achieve more in less time. Let's make every day a productive day!
        </Typography>
        <Box textAlign="center" mt={3}>
          <Button onClick={() => navigate("/signin")} color="inherit">
            Click here to login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePageComponent;
