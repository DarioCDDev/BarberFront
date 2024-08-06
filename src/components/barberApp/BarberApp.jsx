import React, { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Home from '../home/Home';
import PedirCita from '../pedirCita/PedirCita';
import Contacto from "../contacto/Contacto"
import SelectAppointment from '../pedirCita/SelectAppointment';
import { NotFound } from '../notFound/NotFound';
import Login from '../login/Login';
import Register from '../register/Register';
import UserServices from '../../services/user.service';
import MisCitas from '../misCitas/MisCitas';

const BarberApp = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  const getUserInfo = async (token) => {
    try {
      const response = await UserServices.getUserDataWithToken(token);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      getUserInfo(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserInfo(token);
    }
  }, [token]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pedirCita" element={<PedirCita token={token} />}></Route>
        <Route path="/pedirCita/:idBarber/calendar" element={<SelectAppointment token={token} user={user}/>}></Route>
        <Route path="/citas" element={<MisCitas token={token} user={user}/>}></Route>
        <Route path="/login" element={<Login setToken={setToken}/>}></Route>
        <Route path="/register" element={<Register setToken={setToken}/>}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default BarberApp;
