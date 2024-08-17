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

const getAllBarbersPublic = async () => {
  const response = await axios.get(`${API_URL}/public/user/rol`, {
    params: {
      rolId: 1
    },
    
  });
  return response
}

const getAllServices = async () => {
  const response = await axios.get(`${API_URL}/public/service`);
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

const createAppointment = async (user, barber, date,selectedServices, comment, token) => {
  console.log(selectedServices);
  console.log(comment);
  
  
  try {
    const response = await axios.post(`${API_URL}/appointments`, {
      appointment: {
        barberId: barber.idUser,
        clientId: user.idUser,
        appointmentTime: date,
      },
      serviceId: selectedServices.idService,
      comment : comment,
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
  changeAppointmentStatus,
  getAllBarbersPublic,
  getAllServices
};

export default PedirCitaServices;