import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import TelaLogin from "./components/Home";
import TelaCadastro from "./components/TelaCadastro";
import TelaHabitos from "./components/Habitos";
import TelaHoje from "./components/Hoje";
import HabitosContext from "./contexts/HabitosContext";
import "./App.css";

export default function App() {
  const [listaHabitos, setListaHabitos] = useState([]);

  return (
    <HabitosContext.Provider value={{ listaHabitos, setListaHabitos }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TelaLogin />} />
          <Route path="/cadastro" element={<TelaCadastro />} />
          <Route path="/habitos" element={<TelaHabitos />} />
          <Route path="/hoje" element={<TelaHoje />} />
        </Routes>
      </BrowserRouter>
    </HabitosContext.Provider>
  );
}