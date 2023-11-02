import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login.js";
import Home from "./components/HomePage/home.js";
import CreateBlog from "./components/CreateBlog/postblog.js";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/createblog" element={<CreateBlog />} />
    </Routes>
  );
};

export default App;
