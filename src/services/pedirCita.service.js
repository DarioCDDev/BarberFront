import axios from 'axios';

import { API_URL } from "./apiUrl";

const getAllBarbers = async() => {
  const response = await axios.get(`${API_URL}/user/rol`, {
    params: {
      rolId: 1
    },
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXJpb0pXVEBnYW1pbC5jb20iLCJleHAiOjE3MjIyNjQwMjUsInJvbElkIjp7ImlkUm9sIjoxLCJuYW1lIjoiQmFyYmVybyJ9LCJub21icmUiOiJEYXJpb0pXVCJ9.Tlwd1pmRCXMVXt9R8r78B6Wo7Zn1k3bBUyvcqe1cMHkqHd3XX_PQStqmdLj2ekJPGTLuvQWlJQfDnNOtejD3hQ`
    }
  });
  return response
}

const PedirCitaServices = {
  getAllBarbers,
};

export default PedirCitaServices;