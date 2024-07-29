import axios from 'axios';

import { API_URL } from "./apiUrl";

const getAllBarbers = async() => {
  const response = await axios.get(`${API_URL}/user/rol`, {
    params: {
      rolId: 1
    },
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXJpb2NkMDgwOEBnYW1pbC5jb20iLCJleHAiOjE3MjI1NDE0NjAsInJvbElkIjp7ImlkUm9sIjoyLCJuYW1lIjoiQ2xpZW50ZSJ9LCJub21icmUiOiJEYXJpbyJ9.Xy7RBfZaPhxKrVWGUugmzxfuuWQMxe1e2ENj16yYjn5CBr8QgsfQWnaiqmRZaPYOrFLfIrmsV-zuhwkuh4hYnA`
    }
  });
  return response
}

const getBarberCalendar = async(id) => {
  const response = await axios.get(`${API_URL}/appointments/fullCalendar`, {
    params: {
      barberId: id
    },
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXJpb2NkMDgwOEBnYW1pbC5jb20iLCJleHAiOjE3MjI1NDE0NjAsInJvbElkIjp7ImlkUm9sIjoyLCJuYW1lIjoiQ2xpZW50ZSJ9LCJub21icmUiOiJEYXJpbyJ9.Xy7RBfZaPhxKrVWGUugmzxfuuWQMxe1e2ENj16yYjn5CBr8QgsfQWnaiqmRZaPYOrFLfIrmsV-zuhwkuh4hYnA`
    }
  });
  return response
}

const getBarber = async(id) => {
  const response = await axios.get(`${API_URL}/user/${id}`, {
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXJpb2NkMDgwOEBnYW1pbC5jb20iLCJleHAiOjE3MjI1NDE0NjAsInJvbElkIjp7ImlkUm9sIjoyLCJuYW1lIjoiQ2xpZW50ZSJ9LCJub21icmUiOiJEYXJpbyJ9.Xy7RBfZaPhxKrVWGUugmzxfuuWQMxe1e2ENj16yYjn5CBr8QgsfQWnaiqmRZaPYOrFLfIrmsV-zuhwkuh4hYnA`
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