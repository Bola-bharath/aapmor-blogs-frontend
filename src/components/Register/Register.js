import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

const inputFieldStyle = {
  boxShadow: "5px 5px 6px 0px #B5BFC6 inset , -5px -5px 10px 5px #FAFBFF inset",
  backgroundColor: "#EFF2F9",
  borderRadius: "6px",
  "& fieldset": { border: "none" },
};

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfirmPass] = useState("");
  const [isEmployee, setEmployee] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const handleConfirmPassword = (e) => {
    const passwordCheck = e.target.value;
    if (
      passwordCheck.length === password.length &&
      password === passwordCheck
    ) {
    }
  };

  const handleOnsubmitForm = (e) => {
    e.preventDefault();
    const userDetails = { firstname, lastname, email, password, isEmployee };
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background:
          "linear-gradient(133deg, #E4EBF1 0% , #E4EBF1 45%, #3226E5 44%, #3226E5 44.01%, #ffffff 46%, #ffffff 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          boxSizing: "border-box",
          padding: 10,
          alignItems: "center",
          width: "65vw",
          height: "80vh",
          backgroundColor: "#E4EBF1", //6E7F8D
          boxShadow: "0px 0px 16px 0px #bfbfbf",
        }}
        component={"form"}
      >
        <Box>
          <img
            src="https://res.cloudinary.com/saipraveen/image/upload/v1698663764/h7b07riiojvydifto8qw.png"
            alt="register-logo"
            style={{ width: "90%" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "70vh",
            width: "50%",
          }}
          component="form"
          onSubmit={handleOnsubmitForm}
        >
          <Typography variant="h4" textAlign={"center"}>
            Register Now!
          </Typography>

          <TextField
            required
            placeholder="Enter your first name"
            sx={inputFieldStyle}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            placeholder="Enter your last name"
            sx={inputFieldStyle}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            required
            placeholder="Enter your email"
            type="email"
            sx={inputFieldStyle}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            placeholder="Enter your password"
            type="password"
            sx={inputFieldStyle}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            required
            placeholder="Re-enter your password"
            type="password"
            sx={inputFieldStyle}
            onChange={(e) => setConfirmPass(e.target.value)}
          />

          <FormControlLabel
            control={<Switch />}
            label="I am AAPMOR employee"
            onChange={(e) => setEmployee(e.target.checked)}
          />
          <Button
            variant="contained"
            sx={{
              height: "48px",
              marginTop: 2,
              backgroundColor: "#3226E5",
            }}
            type="submit"
          >
            Sign in
          </Button>

          <Typography variant="body1" textAlign={"center"}>
            Already have an account? Login here
          </Typography>
          <Typography variant="body2" color={"red"} textAlign={"center"}>
            Error message
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
