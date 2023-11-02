import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Blog from "../Blog/blog";
import axios from "axios";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";

const Home = () => {
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
    const response = await axios.get("http://192.168.0.106:3005/blogs");
    console.log(response.data);
    setBlogs(response.data);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Header />
        {blogs.map((blogItem) => {
          return <Blog blogDetails={blogItem} key={blogItem._id} />;
        })}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Home;
