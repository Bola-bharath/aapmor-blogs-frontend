import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login.js";
import Home from "./components/HomePage/home.js";
import MyEditor from "./MyEditor.js";
import { useSelector } from "react-redux";
import BlogView from "./components/BlogView/blogview.js";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";
import CreateBlog from "./components/CreateBlog/postblog.js";

const App = () => {
  const themObj = useSelector((state) => state.navbar);
  const darkTheme = createTheme({
    palette: {
      mode: themObj.mode,
      palette: {
        primary: indigo,
        secondary: {
          main: "#0d47a1",
        },
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/createblog" element={<CreateBlog />} />
        <Route exact path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </ThemeProvider>
  );
};
//APP MODIFIED
export default App;
