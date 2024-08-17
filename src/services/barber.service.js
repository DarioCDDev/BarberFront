import axios from 'axios';

import { API_URL } from "./apiUrl";

const getAllAppointments = async (user, token) => {
  const response = await axios.get(`${API_URL}/appointments/barber`, {
    params : {
      barberId: user.idUser
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response
}



const BarberService = {
  getAllAppointments
};

export default BarberService;