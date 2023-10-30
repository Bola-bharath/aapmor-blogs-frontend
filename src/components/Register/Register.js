import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const Register = (props) => {
  return (
    <Box>
      <Box>Image</Box>
      <Box>
        <Typography variant="h3">Register Now!</Typography>

        <TextField
          label="First Name"
          variant="filled"
          placeholder="Enter your first name"
        />
        <TextField
          label="Last Name"
          variant="filled"
          placeholder="Enter your last name"
        />
        <TextField
          label="Email"
          variant="filled"
          placeholder="Enter your email"
        />
      </Box>
    </Box>
  );
};

export default Register;
