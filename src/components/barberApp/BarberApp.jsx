import React, { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Home from '../home/Home';
import PedirCita from '../pedirCita/PedirCita';
import Contacto from "../contacto/Contacto"
import SelectAppointment from '../pedirCita/SelectAppointment';
import { NotFound } from '../notFound/NotFound';
import Login from '../login/Login';

const BarberApp = () => {


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pedirCita" element={<PedirCita />}></Route>
        <Route path="/pedirCita/:idBarber/calendar" element={<SelectAppointment />}></Route>
        <Route path="/contacto" element={<Contacto />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  )
}

export default BarberApp