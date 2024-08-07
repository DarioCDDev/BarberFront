import React, { useEffect, useState } from 'react'
import UserServices from '../../services/user.service'
import formatDateInSpanish from "../utils/formatDateInSpanish"
import "./MisCitas.css"

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
      {appointments.map((appointment, index) => {
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
      })}
    </div>
  )
}

export default MisCitas