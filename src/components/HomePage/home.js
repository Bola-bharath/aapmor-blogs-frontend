import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Blog from "../Blog/blog";
import axios from "axios";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { Box, Chip, Grid, Stack } from "@mui/material";
import styled from "@emotion/styled";
import Add from "../Add/addBlog";

const ChipStyled = styled(Chip)((theme) => {
  return {
    cursor: "pointer",
  };
});

const Home = (props) => {
  const [category, setCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const themObj = useSelector((state) => state.navbar);
  const darkTheme = createTheme({
    palette: {
      mode: themObj.mode,
      primary: {
        main: "#d2edff",
      },
    },
  });

  useEffect(() => {
    getBlogsData();
  }, []);

  const getBlogsData = async () => {
    const response = await axios.get(
      `http://192.168.0.106:3005/blogs/filter/?category=${category}`
    );
    console.log(response.data);
    setBlogs(response.data);
  };
  const handleClick = (e) => {
    setCategory(e.target.textContent);
  };

  useEffect(() => {
    getBlogsData();
  }, [category]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Header />
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        bgcolor={"background.default"}
        color={"text.primary"}
      >
        {/* <SideBar /> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 1.5,
            gap: 4,
            flexWrap: "nowrap",
            overflowX: "hidden",
            width: "auto",
            justifyContent: "center",
            position: "sticky",
            top: "0px",
            zIndex: 1,
          }}
          bgcolor={"background.default"}
          color={"text.primary"}
          onClick={handleClick}
        >
          <ChipStyled
            label="All"
            color={category === "All" ? "primary" : "default"}
            variant={category === "All" ? "filled" : "outlined"}
          />
          <ChipStyled
            label="Fitness"
            color={category === "Fitness" ? "primary" : "default"}
            variant={category === "Fitness" ? "filled" : "outlined"}
          />
          <ChipStyled
            label="Technology"
            color={category === "Technology" ? "primary" : "default"}
            variant={category === "Technology" ? "filled" : "outlined"}
          />
          <ChipStyled
            label="Artificial Intelligence"
            color={
              category === "Artificial Intelligence" ? "primary" : "default"
            }
            variant={
              category === "Artificial Intelligence" ? "filled" : "outlined"
            }
          />
          <ChipStyled
            label="Entertainment"
            color={category === "Entertainment" ? "primary" : "default"}
            variant={category === "Entertainment" ? "filled" : "outlined"}
          />
          <ChipStyled
            label="Politics"
            color={category === "Politics" ? "primary" : "default"}
            variant={category === "Politics" ? "filled" : "outlined"}
          />
          <ChipStyled
            label="International"
            color={category === "International" ? "primary" : "default"}
            variant={category === "International" ? "filled" : "outlined"}
          />
          <ChipStyled
            label="News"
            color={category === "News" ? "primary" : "default"}
            variant={category === "News" ? "filled" : "outlined"}
          />
          <ChipStyled
            label="Sports"
            color={category === "Sports" ? "primary" : "default"}
            variant={category === "Sports" ? "filled" : "outlined"}
          />
          <ChipStyled
            label="Fashion"
            color={category === "Fashion" ? "primary" : "default"}
            variant={category === "Fashion" ? "filled" : "outlined"}
          />
          <ChipStyled
            label="Food"
            color={category === "Food" ? "primary" : "default"}
            variant={category === "Food" ? "filled" : "outlined"}
          />
          <ChipStyled
            label="Arts"
            color={category === "Arts" ? "primary" : "default"}
            variant={category === "Arts" ? "filled" : "outlined"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: "20px",
          }}
        >
          <Grid
            container
            sx={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "",
              maxWidth: "70%",
              gap: 4,
            }}
          >
            {blogs.map((blogItem) => {
              return <Blog blogDetails={blogItem} key={blogItem._id} />;
            })}
          </Grid>
        </Box>
      </Box>
      <Footer />
      <Add />
    </ThemeProvider>
  );
};

export default Home;
