import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from '../home/Home';
import PedirCita from '../pedirCita/PedirCita';
import Contacto from "../contacto/Contacto"

const BarberApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pedirCita" element={<PedirCita />}></Route>
        <Route path="/contacto" element={<Contacto />}></Route>
      </Routes>

    </div>
  )
}

export default BarberApp