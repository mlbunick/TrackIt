import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TelaCadastro from "./components/TelaCadastro";
import Habitos from "./components/Habitos";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<TelaCadastro />} />
        <Route path="/habitos" element={<Habitos />} />
      </Routes>
    </BrowserRouter>
  );
}