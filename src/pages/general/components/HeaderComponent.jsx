import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TaskIcon from '@mui/icons-material/Task';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignInPage = location.pathname === '/signin';
  const isSignUpPage = location.pathname === '/signup';
  const isUserPage = location.pathname === '/user';
  const isAdminPage = location.pathname === '/admin';

  const logout = async() => {
    try {
        navigate("/")
       await axios.get("http://localhost:8000/users/logout", {
        withCredentials: true,
        headers: {
          "Client-Type": "web" 
        }
      });
      
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

  return (
    <Box sx={{ width: '100%', position: "relative", top: 0, left: 0, right: 0 }}>
      <AppBar position="static" sx={{ backgroundColor: '#0D3B52' }}>
        <Toolbar>
          <TaskIcon sx={{ marginRight: '8px', color: 'white' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 3, color: 'white' }}>
            ToDoList
          </Typography>
          {isSignInPage && (
            <>
              <Button onClick={() => navigate("/")} color="inherit">
                Home
              </Button>
            </>
          )}
          {isSignUpPage && (
            <>
              <Button onClick={() => navigate("/")} color="inherit">
                Home
              </Button>
            </>
          )}
          {isUserPage && (
            <>
              <Button onClick={() => { logout(); navigate("/"); }} color="inherit">
                Logout
              </Button>
            </>
          )}
          {isAdminPage && (
            <>
              <Button onClick={() =>  logout()} color="inherit">
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderComponent;
