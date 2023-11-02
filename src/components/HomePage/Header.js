import React from "react";
import { AppBar, Button } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");

  const handleLogoutClick = () => {
    Cookies.remove("jwtToken");
    navigate("/login");
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "#E4F4FF",
        height: "70px",
        color: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        position: "static",
      }}
    >
      <img
        height="70px"
        width="100px"
        src="https://res.cloudinary.com/ddahy4bbc/image/upload/v1698670236/1697545876900-removebg-preview_d7xrcu.png"
        alt="logoAapmor"
      />
      {token !== undefined ? (
        <Button
          variant="contained"
          sx={{ backgroundColor: "#000EE6", width: "140px" }}
          onClick={handleLogoutClick}
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{ backgroundColor: "#000EE6", width: "140px" }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      )}
    </AppBar>
  );
};

export default Header;
