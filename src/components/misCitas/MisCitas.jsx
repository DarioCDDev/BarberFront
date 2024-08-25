import React, { useEffect, useState } from 'react'
import UserServices from '../../services/user.service'
import formatDateInSpanish from "../utils/formatDateInSpanish"
import "./MisCitas.css"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import PedirCitaServices from '../../services/pedirCita.service'
import Loader from '../utils/Loader'

const MisCitas = ({ token, user }) => {

  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getActiveAppointments = async () => {
    try {
      setIsLoading(true)
      const response = await UserServices.getActiveAppointments(user, token)
      let sortedAppointments = response.data;

      // Primero ordenar por idStatus, donde idStatus: 1 va primero
      sortedAppointments.sort((a, b) => {
        if (a.status.idStatus === 1 && b.status.idStatus !== 1) {
          return -1;
        } else if (a.status.idStatus !== 1 && b.status.idStatus === 1) {
          return 1;
        } else {
          // Si ambos tienen el mismo idStatus, ordenar por fecha
          return new Date(a.appointmentTime) - new Date(b.appointmentTime);
        }
      });

      setAppointments(sortedAppointments);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getActiveAppointments()
  }, [])

  const changeAppointmentStatus = async (id) => {
    const status = {
      "idStatus": 2,
      "name": "Eliminado"
    }
    try {
      setIsLoading(true)
      const response = await PedirCitaServices.changeAppointmentStatus(token, id, status);

      if (response.status === 200) {
        await getActiveAppointments();
        toast.success(`Cita cancelada con éxito`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(`Algo salió mal, inténtelo de nuevo`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }).finally(() => {
        setIsLoading(false)
      });
    }
  }

  return (
    <div className="cards">
      <Loader
        isLoading={isLoading} />
      {appointments.length >= 1 ? (
        appointments.map((appointment, index) => {
          return (
            <div
              key={index}
              className={`card ${appointment.status.idStatus === 1 ? 'green' : 'red'}`}
            >
              <p className="tip">
                Día: {formatDateInSpanish(appointment.appointmentTime)}, a las {appointment.appointmentTime.slice(11, 16)}
              </p>
              <p className="tip">Barbero: {appointment.barber.name}</p>
              <div>
                <p className="second-text">Teléfono: {appointment.barber.phone}</p>
                <p className="second-text">Correo: {appointment.barber.email}</p>
              </div>
              {appointment.status.idStatus === 1 && (
                <button
                  onClick={() => changeAppointmentStatus(appointment.idAppointment)}
                  className="sign-in_apl sign-in_apl-appointment"
                >
                  Cancelar cita
                </button>
              )}
            </div>
          )
        })
      ) : (
        <div className="main-content" style={{ textAlign: 'center' }}>
          <h1>Aún no tienes citas</h1>
          <span>
            Para solicitar una cita haga click en el siguiente enlace:
            <Link to="/pedirCita" style={{ textDecoration: 'none', color: '#007BFF', paddingLeft: "5px" }}>
              Pedir cita
            </Link>
          </span>
        </div>
      )}
    </div>
  )
}

export default MisCitas
