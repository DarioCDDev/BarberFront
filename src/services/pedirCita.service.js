import axios from 'axios';

import { API_URL } from "./apiUrl";

const getAllBarbers = async(token) => {
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

const getBarberCalendar = async(id, token) => {
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

const getBarber = async(id, token) => {
  const response = await axios.get(`${API_URL}/user/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response
}

const PedirCitaServices = {
  getAllBarbers,
  getBarberCalendar,
  getBarber
};

export default PedirCitaServices;