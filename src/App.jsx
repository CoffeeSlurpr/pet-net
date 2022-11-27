import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
