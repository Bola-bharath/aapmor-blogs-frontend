import React from "react";
import { AppBar, Button } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      sx={{
        backgroundColor: "#03b6fc",
        height: "70px",
        color: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <img
        height="70px"
        width="100px"
        src="https://res.cloudinary.com/ddahy4bbc/image/upload/v1698670236/1697545876900-removebg-preview_d7xrcu.png"
        alt="logoAapmor"
      />

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#03b6fc",
          borderRadius: "15px",
          boxShadow: "-5px -5px 10px #79d3f7 ,5px 5px 8px #012e40",
          "& fieldset": { border: "none" },
          fontWeight: "bold",
          color: "black",
          fontFamily: "cambria Math",
        }}
      >
        Logout
      </Button>
    </AppBar>
  );
};

export default Header;
