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
import Navbar from '../header/Navbar';
import { Perfil } from '../perfil/Perfil';
import BarberHome from '../barberHome/BarberHome';

const BarberApp = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  const getUserInfo = async (token) => {
    try {
      const response = await UserServices.getUserDataWithToken(token);
      console.log("response", response.data);

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
      <Navbar user={user} />
      <Routes>
        {user?.rolId?.idRol === 1
          ?
          <>
            <Route path="/" element={<BarberHome user={user} token={token} />}></Route>
            <Route path="/perfil" element={<Perfil setToken={setToken} user={user} token={token} setUser={setUser} />}></Route>
          </>
          :
          <>
            <Route path="/" element={<Home user={user} />}></Route>
            <Route path="/pedirCita" element={<PedirCita token={token} />}></Route>
            <Route path="/pedirCita/:idBarber/calendar" element={<SelectAppointment token={token} user={user} />}></Route>
            <Route path="/citas" element={<MisCitas token={token} user={user} />}></Route>
            {user.sub ?
              <>
                <Route path="/perfil" element={<Perfil setToken={setToken} user={user} token={token} setUser={setUser} />}></Route>
              </>
              :
              <>
                <Route path="/login" element={<Login setToken={setToken} />}></Route>
                <Route path="/register" element={<Register setToken={setToken} />}></Route>
              </>
            }

          </>}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default BarberApp;
