import React, { useEffect, useState } from 'react'
import UserServices from '../../services/user.service'
import formatDateInSpanish from "../utils/formatDateInSpanish"
import "./MisCitas.css"
import { Link } from 'react-router-dom'

const MisCitas = ({ token, user }) => {

  const [appointments, setAppointments] = useState([])

  const getActiveAppointments = async () => {
    try {
      await UserServices.getActiveAppointments(user, token).then((response) => {
        console.log(response.data);
        setAppointments(response.data);
      });
    } catch (error) {

    }
  }
  useEffect(() => {
    getActiveAppointments()
  }, [])

  return (
    <div className="cards">
      {
        appointments.length >= 1 ? (
          appointments.map((appointment, index) => {
            if (appointment.status.idStatus === 1) {
              return (
                <div key={index} className="card green">
                  <p className="tip">Dia: {formatDateInSpanish(appointment.appointmentTime)}, a las {appointment.appointmentTime.slice(11, 16)}</p>
                  <p className="tip">Barbero: {appointment.barber.name}</p>
                  <div>
                    <p className="second-text">Teléfono: {appointment.barber.phone}</p>
                    <p className="second-text">Correo: {appointment.barber.email}</p>
                  </div>
                </div>
              )
            } else {
              return (
                <div key={index} className="card red">
                  <p className="tip">Fecha : {formatDateInSpanish(appointment.appointmentTime)}</p>
                  <p className="second-text">Lorem Ipsum</p>
                </div>
              )
            }
          })
        ) : (
          <div className="main-content" style={{ textAlign: 'center' }}>
            <h1>Aun no tienes citas</h1>
            <span>Para solicitar una cita haga click en el siguiente enlace: {<Link to="/pedirCita" style={{ textDecoration: 'none', color: '#007BFF' }}>
              Pedir cita
            </Link>}</span>

          </div>
        )
      }
    </div>
  )
}

export default MisCitas