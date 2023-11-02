import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";
import Home from "./components/HomePage/home.js";
// import Blog from "./components/CreateBlog/postblog.js";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
