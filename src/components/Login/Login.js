//IMPORTS
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { sendOtpApi, loginValidation } from "../ApiCalls/apiCalls";
import { useNavigate } from "react-router-dom";
import { schema } from "../Validations/userValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//MAIN FUNCTION
const Login = () => {
  //STATE HOOKS
  const [buttonText, setButtonText] = useState("Get OTP");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [showOtpView, setShowOtpView] = useState(false);
  const [showEmailView, setShowEmailView] = useState(true);
  const [otp, setOtp] = useState("");
  const [responseOtp, setResponseOtp] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isButtonDisable, setButtonDisable] = useState(true);
  const [isOtpButtonDisable, setOtpButtonDisable] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //CHECKING FOR ALREADY REGISTERED USER AND NAVIGATING TO HOME
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token !== undefined) {
      navigate("/");
    }
  });

  const handleOnSubmitError = (message) => {
    setShowErrMsg(true);
    setErrorMsg(message);
  };

  const handleEmailChange = (e) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setEmail(e.target.value);
    const isValidEmail = emailRegex.test(email);
    console.log(isValidEmail);
  };

  useEffect(() => {
    checkEmailValidation();
  }, [email]);
  const checkEmailValidation = () => {
    if (email.endsWith("@aapmor.com")) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  };

  useEffect(() => {
    checkOtpValidation();
  }, [otp]);

  const checkOtpValidation = () => {
    if (otp.length === 6) {
      setOtpButtonDisable(false);
    } else {
      setOtpButtonDisable(true);
    }
  };

  // OTP ENTERED API CALL
  const handleOtpEntered = async () => {
    setButtonText("Validating...");
    if (otp === responseOtp) {
      const loginDetails = { email };
      const response = await loginValidation(loginDetails);
      const data = response.data;
      if (response.status === 200) {
        setButtonText("Success");
        const jwtToken = data.jwt_token;
        Cookies.set("jwtToken", jwtToken);
        navigate("/");
      } else {
        handleOnSubmitError(data.message);
      }
    }
  };

  // EMAIL VERIFICATION API CALL
  const onSubmitEmail = async (event) => {
    event.preventDefault();
    setButtonText("sending...");
    const response = await sendOtpApi(email);
    const data = response.data;
    setSuccessMsg(data.message);
    setResponseOtp(data.otp);

    if (response.status === 200) {
      setButtonText("Enter OTP");
      setShowEmailView(false);
      setShowOtpView(true);
    } else {
      handleOnSubmitError(data.message);
    }
  };

  //RETURN
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#E4F4FF",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          borderRadius: "15px",
          height: { xs: "70%", lg: "80%" },
          width: { xs: "100%", md: "70%", lg: "50%" },
        }}
      >
        {/* Login */}
        <Grid
          item
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { lg: "space-evenly", xs: "center" },
            alignItems: "center",
            padding: "20px",
            height: "100%",
            borderTopLeftRadius: "15px",
            borderBottomLeftRadius: "15px",
            width: "100%",
          }}
          onSubmit={onSubmitEmail}
        >
          <Stack direction={"row"} spacing={2} alignItems="center">
            <img
              src="https://res.cloudinary.com/ddahy4bbc/image/upload/v1698670236/1697545876900-removebg-preview_d7xrcu.png"
              alt="logoAapmor"
              style={{ width: { xs: "50%", lg: "100%" } }}
            />
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderRightWidth: 5,
                borderColor: "#000EE6",
                height: "100px",
                alignSelf: "center",
              }}
            />
            <Typography variant="h3" color={"#2C007E"}>
              BLOGS
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign={"center"} width={400}>
            Explore, engage, and be inspired. Dive into a world of captivating
            content. Let's get started!
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontFamily: "cambria Math" }}
          >
            Login / Signup
          </Typography>
          {/* email Input */}
          {showEmailView && (
            <TextField
              variant="outlined"
              required
              label="Email"
              id="email"
              {...register("email")}
              error={errors?.email}
              helperText={errors?.mail?.message}
              placeholder="Enter Aapmor email id"
              onChange={handleEmailChange}
              value={email}
              sx={{
                width: { xs: "90%", lg: "60%" },
                marginBottom: { xs: "30px", lg: "0px" },
              }}
            />
          )}
          {showOtpView && (
            <TextField
              variant="outlined"
              required
              label="OTP"
              placeholder="Enter OTP"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              sx={{
                width: { xs: "90%", lg: "60%" },
                marginBottom: { xs: "30px", lg: "0px" },
              }}
            />
          )}
          {/* EMAIL SEND BUTTON */}
          {showEmailView && (
            <Button
              type="submit"
              variant="contained"
              disabled={isButtonDisable}
              sx={{
                width: { xs: "90%", lg: "60%" },
                height: "48px",
                marginBottom: { xs: "30px", lg: "0px" },
                fontWeight: 500,
              }}
            >
              {buttonText}
            </Button>
          )}
          {/*  OTP BUTTON */}
          {showOtpView && (
            <Button
              variant="contained"
              sx={{
                width: { xs: "90%", lg: "60%" },
                height: "48px",
                marginBottom: { xs: "30px", lg: "0px" },
              }}
              onClick={handleOtpEntered}
              disabled={isOtpButtonDisable}
            >
              {buttonText}
            </Button>
          )}
          {showErrMsg && (
            <Typography variant="p" sx={{ color: "red", marginTop: 2 }}>
              *{errorMsg}
            </Typography>
          )}
          {successMsg !== "" && (
            <Typography
              variant="subtitle2"
              sx={{ color: "green", marginTop: 2 }}
            >
              {successMsg}
            </Typography>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
