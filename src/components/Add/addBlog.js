import { Box, Fab, Typography } from "@mui/material";
import React from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";

const Add = (props) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ position: "fixed", bottom: "50px", left: "calc(100% - 230px)" }}>
      <Fab
        variant="extended"
        color="primary"
        onClick={() => navigate("/createblog")}
      >
        <CreateIcon sx={{ mr: 1 }} />
        Create Blog
      </Fab>
    </Box>
  );
};

export default Add;
