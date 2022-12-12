import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Pet from "./pages/Pet";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/pet/:id" element={<Pet />} />
      </Routes>
    </div>
  );
};

export default App;
