import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './SelectAppointment.css';  // Importa el archivo CSS
import PedirCitaServices from '../../services/pedirCita.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import formatDateInSpanish from "../utils/formatDateInSpanish"
import convertToISO8601 from "../utils/convertToISO8601"
import Loader from '../utils/Loader';

const SelectAppointment = ({ token, user }) => {
  const { idBarber } = useParams();
  const [availability, setAvailability] = useState({});
  const [dates, setDates] = useState([]);
  const [barber, setBarber] = useState();
  const [selectedDate, setSelectedDate] = useState(null); 
  const [hours, setHours] = useState([]); 
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedService, setSelectedService] = useState(null)
  const [selectedHour, setSelectedHour] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const navigate = useNavigate();

  const clearData = () => {
    setSelectedHour(null);
    setSelectedCard(null);
    setSelectedServices([]);  // Limpiar servicios seleccionados
  };

  const getAllServices = async () => {
    await PedirCitaServices.getAllServices().then((response) => {
      setServices(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  const getBarberCalendar = async (id) => {
    try {
      setIsLoading(true);
      await PedirCitaServices.getBarberCalendar(id, token).then((response) => {
        setDates(response.data.dateTimestamps.map(date => new Date(date)));
        setAvailability(response.data.availability);
      }).finally(() => {
        setIsLoading(false);
      });
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/pedirCita");
      }
    }
  };

  const getBarber = async (id) => {
    try {
      const response = await PedirCitaServices.getBarber(id, token);
      setBarber(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/pedirCita");
      }
    }
  };

  useEffect(() => {
    getBarber(idBarber);
    getBarberCalendar(idBarber);
    getAllServices();
  }, [idBarber]);

  const tileDisabled = ({ date, view }) => {
    return view === 'month' && !dates.some(d => d.toDateString() === date.toDateString());
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    displayHoursToGetAppointment(date);
    clearData();
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

  const handleCardClick = (index, time) => {
    setSelectedCard(index);
    setSelectedHour(time);
  };
  const handleServiceClick = (index, service) => {
    setSelectedService(index);
    setSelectedServices(service);
  };


  const handleOnSubmitAppointment = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedHour || selectedServices.length === 0) {
      toast.error(`Debe seleccionar fecha, hora y al menos un servicio para crear la cita`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      setIsLoading(true);
      const isoFormattedDate = convertToISO8601(selectedDate, selectedHour);

      await PedirCitaServices.createAppointment(user, barber, isoFormattedDate, selectedServices, "si", token).then((response) => {
        navigate("/");
        toast.success(`Cita creada con éxito, nos vemos pronto 🙂`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }).catch((error) => {
        if (error.response.status === 401) {
          navigate("/login");
          toast.warning(`Para poder pedir una cita primero tiene que iniciar sesión`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        if (error.response.status === 400) {
          toast.warning(`${error.response.data.message}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }).finally(() => {
        setIsLoading(false);
      });
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
        toast.warning(`Para poder pedir una cita primero tiene que iniciar sesión`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (error.response.status === 400) {
        toast.warning(`${error.response.data.message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  
  return (
    <>
      <Loader
        isLoading={isLoading} />
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
                  <div>
                    <span>{`Servicio: `}</span>
                    <span>{`${selectedServices !== undefined ? `${selectedServices.name} - ${selectedServices.price}€` : "Sin seleccionar"}`}</span>
                  </div>
                </div>
                <Button className='btnConfirm' onClick={(e) => handleOnSubmitAppointment(e)}>
                  Confrimar cita
                </Button>
              </div>
              <h5>Selecciona una hora</h5>
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
              <h5>Selecciona un servicio</h5>
              <div className='cardContainer'>
                {services.map((service, index) => (
                  <div key={index} className={`card ${(selectedService === index) && "selectedCard" }`}
                  onClick={() => handleServiceClick(index, service)
                  }
                  >
                    <span>{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

    </>
  );
}

export default SelectAppointment;
