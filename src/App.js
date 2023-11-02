import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login.js";
import Home from "./components/HomePage/home.js";
import { Provider } from "react-redux";
import store from "../src/components/Store/store";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Provider>
  );
};

export default App;
