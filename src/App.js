import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login.js";
import Home from "./components/HomePage/home.js";
import BlogView from "./components/BlogView/blogview.js";
import CreateBlog from "./components/CreateBlog/postblog.js";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/createblog" element={<CreateBlog />} />
      <Route exact path="/blogs/:id" element={<BlogView />} />
    </Routes>
  );
};
//APP MODIFIED
export default App;
