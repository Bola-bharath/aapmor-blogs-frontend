import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { schema } from "./Validations/userValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { submitRegisterApi } from "./registerApi";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  /* const handleConfirmPassword = (e) => {
    const passwordCheck = e.target.value;
    if (
      passwordCheck.length === password.length &&
      password === passwordCheck
    ) {
      console.log("Passwords matched");
    }
  }; */

  const errorMessageFunction = (message) => {
    setErrorMsg(message);
    setShowErrorMsg(true);
  };
  const onSubmit = async () => {
    const userDetails = {
      firstname,
      lastname,
      email,
      password,
      confPassword,
      isEmployee,
    };
    console.log(userDetails);
    const response = await submitRegisterApi(userDetails);
    const data = response.data;
    console.log(data);
    if (response.status === 201) {
      navigate("/login");
    } else {
      errorMessageFunction(data.message);
    }
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
          "linear-gradient(133deg, #E4EBF1 0% , #E4EBF1 45%, #ffffff 45%, #ffffff 100%)",
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h4" textAlign={"center"}>
            Register Now!
          </Typography>

          <TextField
            placeholder="Enter your first name"
            {...register("firstname")}
            sx={inputFieldStyle}
            onChange={(e) => setFirstName(e.target.value)}
            helperText={errors?.firstname?.message}
          />
          <TextField
            placeholder="Enter your last name"
            {...register("lastname")}
            sx={inputFieldStyle}
            onChange={(e) => setLastName(e.target.value)}
            helperText={errors?.lastname?.message}
          />
          <TextField
            placeholder="Enter your email"
            type="email"
            {...register("email")}
            sx={inputFieldStyle}
            onChange={(e) => setEmail(e.target.value)}
            helperText={errors?.email?.message}
          />
          <TextField
            placeholder="Enter your password"
            {...register("password")}
            type="password"
            sx={inputFieldStyle}
            onChange={(e) => setPassword(e.target.value)}
            helperText={errors?.password?.message}
          />
          <TextField
            placeholder="Re-enter your password"
            {...register("confPassword")}
            type="password"
            sx={inputFieldStyle}
            onChange={(e) => setConfirmPass(e.target.value)}
            helperText={errors?.confPassword?.message}
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
            Already have an account? <a href="/login">Login</a> here
          </Typography>
          {showErrorMsg && (
            <Typography variant="body2" color={"red"} textAlign={"center"}>
              {errorMsg}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
