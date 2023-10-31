import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Button,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginClicked = (event) => {
    event.preventDefault();
    const loginDetails = { email, password };
    //code to write
    //code to write
    setEmail("");
    setPassword("");
  };
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "sans-serif",
        backgroundImage: `url(${"https://wallpaperaccess.com/full/414633.jpg"})`,
        backgroundSize: "cover",
      }}
    >
      <Paper
        elevation={5}
        sx={{ borderRadius: "15px", height: "85%", display: "flex" }}
      >
        {/* Login */}
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
            borderTopLeftRadius: "15px",
            borderBottomLeftRadius: "15px",
            backgroundColor: "#ebecf0",
            width: "350px",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontFamily: "cambria Math" }}
          >
            Login
          </Typography>
          {/* email Input */}
          <TextField
            required
            id="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            sx={{
              width: "250px",
              margin: "5px",
              borderRadius: "20px",
              boxShadow:
                "inset 7px 2px 5px #babebc, inset -5px -5px 10px #ffffff",
              "& fieldset": { border: "none" },
              backgroundColor: "#ebecf0",
            }}
          />
          {/* input Password */}
          <FormControl
            sx={{
              width: "250px",
              margin: "5px",
              borderRadius: "20px",
              boxShadow:
                "inset 7px 2px 5px #babebc , inset -5px -5px 10px #ffffff",
              "& fieldset": { border: "none" },
              backgroundColor: "#ebecf0",
            }}
          >
            <OutlinedInput
              required
              id="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {/* Login Button */}
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
            onClick={loginClicked}
          >
            Login
          </Button>
          <Link
            to="/forgetPassword"
            sx={{ textDecoration: "none" }}
            underline="none"
          >
            <Typography
              variant="caption"
              gutterBottom
              underline="none"
              sx={{
                margin: "5px",
                color: "red",
                cursor: "pointer",
                outline: "none",
                textDecoration: "none",
                fontFamily: "cambria Math",
                alignContent: "flex-start",
              }}
            >
              Forget Password?
            </Typography>
          </Link>
        </Grid>
        {/* Welcome Aapmor */}
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
            borderTopRightRadius: "15px",
            borderBottomRightRadius: "15px",
            color: "white",
            width: "350px",
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
            Welcome to Aapmor
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontFamily: "cambria Math" }}
          >
            Enter your personal Details and start Journey with us
          </Typography>
          <Link to="/register">
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
                marginBottom: "140px",
                fontFamily: "cambria Math",
              }}
            >
              SignUp
            </Button>
          </Link>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
