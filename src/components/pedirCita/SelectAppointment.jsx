import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './SelectAppointment.css';  // Importa el archivo CSS
import PedirCitaServices from '../../services/pedirCita.service';
import { useNavigate, useParams } from 'react-router-dom';

const SelectAppointment = () => {
  const { idBarber } = useParams();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [dates, setDates] = useState([]);
  const [barber, setBarber] = useState();

  const navigate = useNavigate();

  const getBarberCalendar = async (id) => {
    console.log(id);
    try {
      const response = await PedirCitaServices.getBarberCalendar(id);
      setAvailableTimes(response.data.availableTimes);
      setDates(response.data.dates.map(date => new Date(date)));
    } catch (error) {
      navigate("/")
    }
  }

  const getBarber = async (id) => {
    try {
      const response = await PedirCitaServices.getBarber(id);
      setBarber(response.data)
    } catch (error) {
      navigate("/")
    }
  }

  useEffect(() => {
    getBarber(idBarber)
    getBarberCalendar(idBarber);
  }, [idBarber]);

  const tileDisabled = ({ date, view }) => {
    return view === 'month' && !dates.some(d => d.toDateString() === date.toDateString());
  };

  return (
    <>
      <div className="main-content">
        {barber?.name}
        <div className="calendar-container">
          <Calendar
            tileDisabled={tileDisabled}
          />
        </div>
      </div>
    </>
  );
}

export default SelectAppointment;
