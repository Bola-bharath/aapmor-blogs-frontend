import React from "react";
import { useState } from "react";
import axios from "axios";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { schema } from "../Register/Validations/userValidations";

const displayViews = {
  emailView: "EMAIL",
  otpView: "OTP",
  passwordView: "PASSWORD",
};

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [responseOtp, setResponseOtp] = useState("");
  // const [showUpdatePassView, setShowUpdatePassView] = useState(false);
  const [updatePassword, setUpdatePassword] = useState("");
  // const [showEmailInput, setShowEmailInput] = useState(false);
  const [displayView, setDisplayView] = useState(displayViews.emailView);
  const [isShowOtpText, setIsShowOtpText] = useState(false);
  console.log(responseOtp);

  const handleForgetPassword = async () => {
    console.log(email);
    const url = "http://localhost:3005/sendEmail";
    const response = await axios.post(url, { email });
    const data = await response.data;
    if (response.statusText === "OK") {
      setIsShowOtpText(true);
      setResponseOtp(data.otp);
      setDisplayView(displayViews.otpView);
    } else {
      alert(data.message);
      navigate("/register");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === responseOtp) {
      setDisplayView(displayViews.passwordView);
    }
  };

  const handleUpdatePassword = async () => {
    const url = "http://localhost:3005/users/";
    const response = await axios.put(url, { updatePassword, email });
    const data = await response.data;
    console.log(response);
    console.log(data);
    if (response.status === 200) {
      navigate("/login");
    }
  };

  const updatePasswordView = () => {
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
            variant="h4"
            gutterBottom
            sx={{ fontFamily: "cambria Math" }}
          >
            Reset Password
          </Typography>
          <TextField
            required
            type="password"
            placeholder="New Password"
            value={updatePassword}
            sx={{
              width: "300px",
              margin: "5px",
              borderRadius: "20px",
              boxShadow:
                "inset 7px 2px 5px #babebc, inset -5px -5px 10px #ffffff",
              "& fieldset": { border: "none" },
              backgroundColor: "#ebecf0",
            }}
            onChange={(e) => setUpdatePassword(e.target.value)}
          />
          <TextField
            required
            type="password"
            placeholder="Confirm Password"
            value={updatePassword}
            sx={{
              width: "300px",
              margin: "5px",
              borderRadius: "20px",
              boxShadow:
                "inset 7px 2px 5px #babebc, inset -5px -5px 10px #ffffff",
              "& fieldset": { border: "none" },
              backgroundColor: "#ebecf0",
            }}
            onChange={(e) => setUpdatePassword(e.target.value)}
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
            onClick={handleUpdatePassword}
          >
            Update
          </Button>
        </Paper>
      </Grid>
    );
  };
  const renderOtpView = () => {
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
            variant="h4"
            gutterBottom
            sx={{ fontFamily: "cambria Math" }}
          >
            Enter your OTP
          </Typography>
          <TextField
            required
            id="otp"
            placeholder="Enter OTP"
            value={otp}
            sx={{
              width: "200px",
              margin: "5px",
              borderRadius: "20px",
              boxShadow:
                "inset 7px 2px 5px #babebc, inset -5px -5px 10px #ffffff",
              "& fieldset": { border: "none" },
              backgroundColor: "#ebecf0",
            }}
            onChange={(e) => setOtp(e.target.value)}
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
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </Button>
          {isShowOtpText && (
            <Typography
              variant="para"
              gutterBottom
              sx={{
                fontFamily: "cambria Math",
                marginTop: "10px",
                textAlign: "start",
              }}
            >
              OTP sent to your email
            </Typography>
          )}
        </Paper>
      </Grid>
    );
  };
  const renderEmailView = () => {
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
            variant="h4"
            gutterBottom
            sx={{ fontFamily: "cambria Math" }}
          >
            Verify Email
          </Typography>
          <TextField
            required
            id="email"
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
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleForgetPassword}
          >
            Send
          </Button>
          {isShowOtpText && (
            <Typography
              variant="para"
              gutterBottom
              sx={{
                fontFamily: "cambria Math",
                marginTop: "10px",
                textAlign: "start",
              }}
            >
              OTP sent to your email
            </Typography>
          )}
        </Paper>
      </Grid>
    );
  };
  const renderRequiredView = () => {
    switch (displayView) {
      case "EMAIL":
        return renderEmailView();
      case "OTP":
        return renderOtpView();
      case "PASSWORD":
        return updatePasswordView();
      default:
        return renderEmailView();
    }
  };
  return <>{renderRequiredView()}</>;
};

export default ForgetPassword;
