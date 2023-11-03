import { Box, Fab } from "@mui/material";
import React from "react";
//import NavigationIcon from "@mui/icons-material/Navigation";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

const Add = (props) => {
  const navigate = useNavigate();
  let blog;

  const token = Cookies.get("jwtToken");

  if (token !== undefined) {
    blog = "visible";
  } else {
    blog = "none";
  }

  return (
    <Box
      sx={{
        position: "fixed",
        display: `${blog}`,
        bottom: "50px",
        left: "calc(100% - 230px)",
      }}
    >
      <Fab
        variant="extended"
        onClick={() => navigate("/createblog")}
        bgcolor={"background.default"}
        color={"text.primary"}
      >
        <CreateIcon sx={{ mr: 1 }} />
        Create Blog
      </Fab>
    </Box>
  );
};

export default Add;
