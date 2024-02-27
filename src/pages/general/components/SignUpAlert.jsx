import React from "react";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

const SignUpAlert = ({ error }) => {
  return error ? (
    <Alert severity="error">
      <Typography>{error}</Typography>
    </Alert>
  ) : null;
};

export default SignUpAlert;
