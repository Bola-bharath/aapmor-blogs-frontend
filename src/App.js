import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register.js";

const App = (props) => {
  return (
    <Routes>
      <Route exact path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
