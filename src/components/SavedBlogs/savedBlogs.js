import React, { useEffect } from "react";
import Header from "../HomePage/header";
import { Box, Typography } from "@mui/material";
import BottomNavbar from "../BottomNavigation/bottomNavigation";

const SavedBlogs = (props) => {
  /* useEffect(() => {
    const getSavedBlogs = async () => {
      const response = await getSavedBlogsApi();
    };
  }); */
  return (
    <>
      <Header />
      <Box>
        <Typography>Saved Blogs Page under development</Typography>
      </Box>
      <BottomNavbar />
    </>
  );
};

export default SavedBlogs;
