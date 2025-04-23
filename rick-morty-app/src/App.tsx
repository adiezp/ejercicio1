// import React from "react";
import './App.css'
import { Routes, Route } from "react-router-dom";
import { CharacterList } from "./components/CharacterList";
import { CharacterDetail } from "./components/CharacterDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CharacterList />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
    </Routes>
  );
};

export default App;
