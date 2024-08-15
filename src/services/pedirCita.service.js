import axios from 'axios';

import { API_URL } from "./apiUrl";

const getAllBarbers = async (token) => {
  const response = await axios.get(`${API_URL}/user/rol`, {
    params: {
      rolId: 1
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response
}

const getBarberCalendar = async (id, token) => {
  const response = await axios.get(`${API_URL}/appointments/fullCalendar`, {
    params: {
      barberId: id
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response
}

const getBarber = async (id, token) => {
  const response = await axios.get(`${API_URL}/user/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response
}

const createAppointment = async (user, barber, date, token) => {
  try {
    const response = await axios.post(`${API_URL}/appointments`, {
      appointment: {
        barberId: barber.idUser,
        clientId: user.idUser, // Corrigiendo el error tipográfico
        appointmentTime: date,           // Asegurando que la fecha esté en el lugar correcto
      },
      statusId: 1           // Ajustando el statusId si es necesario
    }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });

    return response;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

const changeAppointmentStatus = async (token, id, statusData) => {
  try {
    const response = await axios.put(`${API_URL}/appointments/${id}`, {
      status: {
        idStatus: statusData.idStatus,
        name: statusData.name
      }
    }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    return error

  }
}


const PedirCitaServices = {
  getAllBarbers,
  getBarberCalendar,
  getBarber,
  createAppointment,
  changeAppointmentStatus
};

export default PedirCitaServices;