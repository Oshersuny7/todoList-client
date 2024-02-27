import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useSignInState from "../hooks/useSignInState";

const SignInComponent = ({ handleSignIn }) => {

  const {formData,
    errors,
    error,
    handleChange,
    validateForm,
    setSubmitted,
    } = useSignInState(); 

  const navigate = useNavigate();

  const [loginUserResponseState, setLoginUserResponseState] = useState({
    loading: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitted(true);

    if (validateForm()) {
      setLoginUserResponseState({ loading: true });
      const { email, password } = formData;

      try {
        await handleSignIn(email, password);
        
        errors({});
      } catch (error) {
        setLoginUserResponseState({ loading: false }); 
      }
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "86vh",
        justifyContent: "center",
        alignItems: "center",
        mt: 3.8,
      }}
    >
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && ( 
            <Typography color="error" variant="subtitle2" align="center">
              {error}
            </Typography>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 0 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
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
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ display: "flex", justifyContent: "center", width:"100%",mt:3}}
            >
              {loginUserResponseState &&
              loginUserResponseState.loading === true ? (
                <CircularProgress size={24} />
              ) : (
                "Sign In"
              )}
            </Button>
            <Button sx={{mt:3,width:"100%"}} onClick={() => navigate("/signup")} >dont have an account? click here</Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInComponent;
