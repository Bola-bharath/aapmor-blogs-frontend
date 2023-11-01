import React, { useState } from "react";
import {
  Grid,
  Paper,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { schema } from "../Validations/userValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { submitRegisterApi } from "../ApiCalls/apiCalls";

const inputFieldStyle = {
  width: "300px",
  margin: "5px",
  borderRadius: "20px",
  boxShadow: "inset 7px 2px 5px #babebc, inset -5px -5px 10px #ffffff",
  "& fieldset": { border: "none" },
  backgroundColor: "#ebecf0",
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
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${"https://wallpaperaccess.com/full/414633.jpg"})`,
        backgroundSize: "cover",
        fontFamily: "cambria Math",
      }}
    >
      <Paper
        elevation={5}
        sx={{ borderRadius: "15px", height: "85%", display: "flex" }}
      >
        {/* welcome Aapmor */}
        <Grid
          item
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            height: "100%",
            backgroundColor: "#ff4b2b",
            borderTopLeftRadius: "15px",
            borderBottomLeftRadius: "15px",
            color: "white",
            width: "400px",
          }}
        >
          <img
            src="https://res.cloudinary.com/ddahy4bbc/image/upload/v1698670236/1697545876900-removebg-preview_d7xrcu.png"
            alt="logoAapmor"
          />
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontFamily: "cambria Math" }}
          >
            Welcome Back
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontFamily: "cambria Math" }}
          >
            To keep connected with us, please Login with your personal info
          </Typography>
          <Link to="/login">
            <Button
              sx={{
                borderRadius: "15px",
                width: "150px",
                margin: "5px",
                marginTop: "10px",
                boxShadow: "-5px -5px 10px #fa835f ,5px 5px 8px #b52e05",
                "& fieldset": { border: "none" },
                fontWeight: "bold",
                color: "white",
                fontFamily: "cambria Math",
              }}
            >
              Login
            </Button>
          </Link>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            height: "100%",
            borderTopRightRadius: "15px",
            borderBottomRightRadius: "15px",
            backgroundColor: "#ebecf0",
            width: "400px",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", fontFamily: "cambria Math" }}
          >
            Create Account
          </Typography>
          {/* first name */}
          <TextField
            required
            size="small"
            id="firstName"
            placeholder="Enter your first name"
            {...register("firstname")}
            sx={inputFieldStyle}
            onChange={(e) => setFirstName(e.target.value)}
            helperText={errors?.firstname?.message}
          />
          {/* second name */}
          <TextField
            required
            size="small"
            id="secondName"
            placeholder="Enter your last name"
            {...register("lastname")}
            sx={inputFieldStyle}
            onChange={(e) => setLastName(e.target.value)}
            helperText={errors?.lastname?.message}
          />
          {/* email input */}
          <TextField
            required
            size="small"
            id="email"
            placeholder="Enter your email"
            type="email"
            {...register("email")}
            sx={inputFieldStyle}
            onChange={(e) => setEmail(e.target.value)}
            helperText={errors?.email?.message}
          />
          {/* password Input */}
          <TextField
            required
            size="small"
            id="password"
            placeholder="Enter your password"
            {...register("password")}
            type="password"
            sx={inputFieldStyle}
            onChange={(e) => setPassword(e.target.value)}
            helperText={errors?.password?.message}
          />
          {/* conform password */}
          <TextField
            required
            size="small"
            id="conform Password"
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
            sx={{ fontFamily: "cambria Math" }}
            onChange={(e) => setEmployee(e.target.checked)}
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
            type="submit"
          >
            Sign Up
          </Button>

          {showErrorMsg && (
            <Typography variant="body2" color={"red"} textAlign={"center"}>
              {errorMsg}
            </Typography>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Register;
