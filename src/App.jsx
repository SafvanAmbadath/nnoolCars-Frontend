import React from "react";
import AnimateRouters from "./AnimateRouters";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AnimateRouters />
      </BrowserRouter>
    </div>
  );
}

export default App;
