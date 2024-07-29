import axios from 'axios';
import { API_URL } from './apiUrl';

const login = async (data) => {
  console.log(data.email);
  console.log(data.password);
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: data.email,
      password: data.password,
    });
    localStorage.setItem("token", response.data.token)
    return response;
  } catch (error) {
    if (error.response) {
      // La solicitud fue realizada y el servidor respondió con un estado que no está en el rango de 2xx
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      console.error('Error Response Headers:', error.response.headers);
    } else if (error.request) {
      // La solicitud fue realizada pero no se recibió respuesta
      console.error('Error Request:', error.request);
    } else {
      // Algo pasó al configurar la solicitud
      console.error('Error Message:', error.message);
    }
    throw error;
  }
};


const UserServices = {
  login,
};

export default UserServices;
