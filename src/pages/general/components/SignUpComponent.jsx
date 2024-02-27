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
import useSignUpState from "../hooks/useSignUpState";

const SignUpComponent = ({ handleSignUp }) => {
  const navigate = useNavigate();
  
  const {
    signUpUserResponseState,
    formData,
    handleChange,
    errors,
    validateForm,
  } = useSignUpState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        await handleSignUp(
          formData.name,
          formData.lastName,
          formData.email,
          formData.password
        );
      } catch (error) {
        console.error("Error during sign-up:", error);
      }
    } else {
      console.log("Form has errors, please fix them.");
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 2,
            mx: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="First Name"
              name="name"
              autoComplete="given-name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              sx={{ fontSize: "0.8rem", marginBottom: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              sx={{ fontSize: "0.8rem", marginBottom: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              sx={{ fontSize: "0.8rem", marginBottom: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              sx={{ fontSize: "0.8rem", marginBottom: 1 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {signUpUserResponseState &&
              signUpUserResponseState.loading === true ? (
                <CircularProgress size={24} />
              ) : (
                "Sign Up"
              )}
            </Button>

            <Box display={"flex"}>
              <Button
                type="submit"
                fullWidth
                variant=""
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/signin")}
              >
                Already have an account?
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUpComponent;
