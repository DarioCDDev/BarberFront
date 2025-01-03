import axios from 'axios';
import { API_URL } from './apiUrl';


const healtcheck = async () => {
  try {
    const response = await axios.get(`${API_URL}/public/healtcheck`)
    return response
  } catch (error) {
    return error
  }
}

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

    return response
  } catch (error) {
    return error
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

  }
};

const getPhoto = async (userId, token) => {
  const response = await axios.get(`${API_URL}/${userId}/photo`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    responseType: 'arraybuffer' // Importante para recibir datos binarios
  });
  return response
};

const updateUser = async (userId, data, token) => {


  const responseData = {
    user: {
      name: data.name,
      phone: data.phone,
      password: data.password
    },
    newPassword: data.confirmPassword,
  }

  try {

    const response = await axios.put(`${API_URL}/user/${userId}`, responseData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });


    return response;
  }
  catch (error) {
    return error;
  }
}

const verifyAccount = async (email, code, token) => {
  try {
    const response = await axios.post(`${API_URL}/verify`,
      {
        email: email,
        code: code
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

const getUserByRolId = async (rolId, token) => {
  try {
    const response = await axios.get(`${API_URL}/public/user/rol`,
      {
        params: {
          rolId: rolId
        }
      },
    );
    return response;
  } catch (error) {
    return error
  }
}


const resendCode = async (email, token) => {

  try {
    const response = await axios.get(`${API_URL}/public/resendcode`,
      {
        params: {
          email: email
        }
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}


const deleteUser = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`,

      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}





const UserServices = {
  healtcheck,
  login,
  register,
  getUserDataWithToken,
  getActiveAppointments,
  uploadPhoto,
  getPhoto,
  updateUser,
  verifyAccount,
  resendCode,
  deleteUser,
  getUserByRolId
};

export default UserServices;
