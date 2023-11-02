import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login.js";
// import Register from "./components/Register/Register.js";
// import ForgetPassword from "./components/ForgetPassword/ForgetPassword.js";
import Home from "./components/HomePage/home.js";
import Blog from "./components/CreateBlog/postblog.js";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/blog" element={<Blog />} />
    </Routes>
  );
};

export default App;
