import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './SelectAppointment.css';  // Importa el archivo CSS
import PedirCitaServices from '../../services/pedirCita.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ClipLoader from "react-spinners/ClipLoader";

const SelectAppointment = ({ token }) => {
  const { idBarber } = useParams();
  const [availability, setAvailability] = useState({});
  const [dates, setDates] = useState([]);
  const [barber, setBarber] = useState();
  const [selectedDate, setSelectedDate] = useState(null); // Estado para la fecha seleccionada
  const [hours, setHours] = useState([]); // Estado para las horas disponibles
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedHour, setSelectedHour] = useState();
  const [isloading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const clearData = () => {
    setSelectedHour();
    setSelectedCard();
  }

  const getBarberCalendar = async (id) => {
    try {
      setIsLoading(true)
      await PedirCitaServices.getBarberCalendar(id, token).then((response) => {
        setDates(response.data.dateTimestamps.map(date => new Date(date)));
        setAvailability(response.data.availability);

      }).then((error) => {

      }).finally(() => {
        setIsLoading(false)
      });
    } catch (error) {
      console.log(error);
    }
  }

  const getBarber = async (id) => {
    try {
      const response = await PedirCitaServices.getBarber(id, token);
      setBarber(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBarber(idBarber);
    getBarberCalendar(idBarber);
  }, [idBarber]);

  const tileDisabled = ({ date, view }) => {
    return view === 'month' && !dates.some(d => d.toDateString() === date.toDateString());
  };

  const handleDateChange = (date) => {
    console.log("cambios");
    setSelectedDate(date);
    displayHoursToGetAppointment(date); // Muestra las horas al seleccionar la fecha
    clearData()
  };

  const displayHoursToGetAppointment = (date) => {
    if (!date) {
      setHours([]);
      return;
    }
    const formattedDate = formatDate(date);
    const hoursAvailable = availability[formattedDate] || [];
    setHours(hoursAvailable);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateInSpanish = (date) => {
    if (!date) return "";
    
    // Definir los nombres de los días y meses en español
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayOfWeek}, ${day} de ${month} de ${year}`;
  };

  const handleCardClick = (index, time) => {
    console.log(time);
    setSelectedCard(index);
    setSelectedHour(time)
  };

  return (
    <>
      {isloading &&
        <div className="loader-container">
          <div className="loader-spinner">
            <ClipLoader
              loading={isloading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      }
      <div className="main-content">
        Seleciona la fecha de tu cita
        <div className="calendar-container">
          <Calendar
            tileDisabled={tileDisabled}
            onChange={handleDateChange}
            onClickDay={(e) => console.log(e)}
          />
        </div>
        {selectedDate && (
          <>
            <div className="available-hours">
              <div class="card finalCard">
                <div>
                  <span className=''>{`Barbero: `}</span>
                  <span>{`${barber.name}`}</span>
                </div>
                <div>
                  <div>
                    <span>{`Día: `}</span>
                    <span>{`${formatDateInSpanish(selectedDate)}`}</span>
                  </div>
                  <div>
                    <span>{`Hora: `}</span>
                    <span>{`${selectedHour || "Sin seleccionar"}`}</span>
                  </div>
                </div>
              </div>
              {hours.length > 0 ? (
                <div className='cardContainer'>
                  {hours.map((slot, index) => (
                    <div key={index} className={`card ${(selectedCard === index && slot.status === "available") ? 'selectedCard' : (slot.status === "available" ? "availableCard" : "notAvailableCard")}`}
                      onClick={() => handleCardClick(index, slot.status === "available" && slot.time)}>
                      <span>{slot.time}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No hay horas disponibles para esta fecha.</p>
              )}
            </div>
          </>
        )}
      </div>

    </>
  );
}

export default SelectAppointment;
