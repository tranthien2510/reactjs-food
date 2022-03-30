import React from "react";
import Home from "./Home";
import Cuisine from "./Cuisine";
import Seacrched from "./Seacrched";
import Recipe from "./Recipe";
import { Routes, Route } from "react-router-dom";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cuisine/:type" element={<Cuisine />} />
      <Route path="/searched/:search" element={<Seacrched />} />
      <Route path="/recipe/:name" element={<Recipe />} />
    </Routes>
  );
}

export default Pages;
