import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import PaginaInicial from "./pages/paginaInicial.jsx"
import PaginaLogin from "./pages/paginaLogin.jsx"
import PaginaMostrarEntidad from "./pages/paginaMostrarEntidad.jsx"
import PaginaMapa from "./mapas/Principal.js"
import CrearEvento from "./eventos/crearEvento.js"
import InfoEvento from "./eventos/infoEvento.js"



function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaInicial/>}/>
          <Route path="/login" element={<PaginaLogin/>}/>
          <Route path="/crearEvento" element={<CrearEvento/>}/>
          <Route path="/infoEvento/:idEvento" element={<InfoEvento/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
