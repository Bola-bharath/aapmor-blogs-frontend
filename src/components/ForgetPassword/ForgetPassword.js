import React from "react";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";

const ForgetPassword = () => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fa7e50",
      }}
    >
      <Paper
        elevation={5}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          height: "60%",
          borderRadius: "15px",
          backgroundColor: "#ebecf0",
          width: "400px",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontFamily: "cambria Math" }}
        >
          Verify Email
        </Typography>
        <TextField
          required
          id="email"
          defaultValue=""
          placeholder="Email"
          sx={{
            width: "350px",
            margin: "5px",
            borderRadius: "20px",
            boxShadow:
              "inset 7px 2px 5px #babebc, inset -5px -5px 10px #ffffff",
            "& fieldset": { border: "none" },
            backgroundColor: "#ebecf0",
          }}
        />
        <Button
          sx={{
            borderRadius: "15px",
            width: "150px",
            margin: "5px",
            marginTop: "10px",
            boxShadow: "-5px -5px 10px #ffffff ,5px 5px 8px #babebc",
            "& fieldset": { border: "none" },
            fontWeight: "bold",
            color: "#595959",
            fontFamily: "cambria Math",
          }}
        >
          Send
        </Button>
        <Typography
          variant="para"
          gutterBottom
          sx={{
            fontFamily: "cambria Math",
            marginTop: "10px",
            textAlign: "start",
          }}
        >
          OTP will be sent to your mail
        </Typography>
      </Paper>
    </Grid>
  );
};

export default ForgetPassword;
