import axios from 'axios';
import { API_URL } from './apiUrl';

const login = async (data, setToken) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: data.email,
      password: data.password,
    });
    localStorage.setItem("token", response.data.token)
    setToken(response.data.token)
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

const register = async (data, setToken) => {
  console.log(data);
  try {
    const response = await axios.post(`${API_URL}/register`, {
      rol_id: 2,
      user: {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone
      },
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.status === 200) {
      await login(data, setToken);
    }
    return response;
  } catch (error) {
    throw error;
  }
}

const getUserDataWithToken = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/token`, {
      params: {
        token: token
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);
    return response
  } catch (error) {
    console.log(error);
  }
}

const getActiveAppointments = async (user, token) => {
  try {
    const response = await axios.get(`${API_URL}/appointments/client`, {
      params: {
        clientId: user.idUser,
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response
  } catch (error) {
    console.log(error);
  }
}

const uploadPhoto = async (photo, userId, token) => {
  try {
    const formData = new FormData();
    formData.append('photo', photo);
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    };


    const response = await axios.post(`${API_URL}/${userId}/photo`, formData, config);

    return response;
  } catch (error) {
    console.log(error);
  }
};

const getPhoto = (userId, token) => {
  return axios.get(`${API_URL}/${userId}/photo`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    responseType: 'arraybuffer' // Importante para recibir datos binarios
  });
};




const UserServices = {
  login,
  register,
  getUserDataWithToken,
  getActiveAppointments,
  uploadPhoto,
  getPhoto
};

export default UserServices;
