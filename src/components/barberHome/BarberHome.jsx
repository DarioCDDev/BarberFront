import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button } from 'react-bootstrap';
import BarberService from '../../services/barber.service';
import formatDateInSpanish from '../utils/formatDateInSpanish';
import PedirCitaServices from '../../services/pedirCita.service';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Loader from '../utils/Loader';

const BarberHome = ({ user, token }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [calendarView, setCalendarView] = useState(Views.MONTH); // Estado para controlar la vista del calendario
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false)

  const getAllAppointments = async () => {
    setIsLoading(true)
    await BarberService.getAllAppointments(user, token).then((response) => {
      setAppointments(response.data);
    }).catch((error) => {

    }).finally(() => {
      setIsLoading(false)
    });
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  const changeAppointmentStatus = async (id, statusId) => {
    const status = {
      idStatus: statusId,
      name: statusId === 2 ? "Eliminado" : "Hecho",
    };
    try {
      const response = await PedirCitaServices.changeAppointmentStatus(token, id, status);

      if (response.status === 200) {
        statusId === 4
          ? toast.success(`Cita confirmada con éxito`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          : toast.success(`Cita cancelada con éxito`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        getAllAppointments();
      }
    } catch (error) {
      toast.error(`Algo salió mal, inténtelo de nuevo`, {
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
  };

  const events = appointments.map((appointment) => {
    const appointmentTime = moment(appointment.appointmentTime).format("HH:mm");
    return {
      id: appointment.idAppointment,
      title: `${appointment.client.name} - ${appointment.service.name} - ${appointment.status.name}`,
      start: new Date(appointment.appointmentTime),
      end: moment(appointment.appointmentTime).add(30, "minutes").toDate(),
      barber: appointment.barber.name,
      client: appointment.client.name,
      service: appointment.service.name,
      comments: appointment.comments,
      status: appointment.status,
      statusId: appointment.status.idStatus, // Guarda el idStatus para facilitar el uso en eventPropGetter
    };
  });

  const eventStyleGetter = (event) => {
    let backgroundColor;
    switch (event.statusId) {
      case 1:
        backgroundColor = "#28a745"; // Verde
        break;
      case 2:
        backgroundColor = "#dc3545"; // Rojo
        break;
      case 3:
        backgroundColor = "#ffc107"; // Amarillo
        break;
      case 4:
        backgroundColor = "#007bff"; // Azul
        break;
      default:
        backgroundColor = "#6c757d"; // Gris
    }
    const style = {
      backgroundColor,
      borderRadius: "5px",
      color: "white",
      border: "none",
    };
    return {
      style,
    };
  };

  const localizer = momentLocalizer(moment);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setCalendarView(Views.DAY); // Cambia la vista a 'day'
  };

  const handleViewChange = (newView) => {
    setCalendarView(newView);
    if (newView === Views.MONTH) {
      setSelectedDate(new Date()); // Reinicia la fecha seleccionada al cambiar a vista mensual
    }
  };

  const completeButton = () => {
    Swal.fire({
      title: "¿Seguro que quieres marcar como completada la cita?",
      text: "Una vez marcada como completada no podrá aplicar mas acciones sobre la cita",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, marcar como completada"
    }).then((result) => {
      if (result.isConfirmed) {
        changeAppointmentStatus(selectedEvent.id, 4)
        toast.success(`Cita marcada como completada con éxito`, {
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
    });
  }

  const cancelButton = () => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar la cita?",
      text: "Una vez eliminada no podrá aplicar mas acciones sobre la cita",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        changeAppointmentStatus(selectedEvent.id, 2)
        toast.success(`Cita eliminada con éxito`, {
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
    });
  }

  return (
    <div className="main-content-home" style={{ height: "100vh", width: "100vw" }}>
      <Loader isLoading={isLoading} />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", width: "100%" }}
        onSelectEvent={handleSelectEvent}
        // onSelectSlot={handleSelectSlot} // Maneja la selección de un día
        // selectable={true} // Habilita la selección de días
        // view={calendarView} // Controla la vista actual del calendario
        // onView={handleViewChange} // Controla el cambio de vista
        // date={selectedDate} // Establece la fecha seleccionada
        eventPropGetter={eventStyleGetter} // Aplica estilos a través de eventPropGetter

      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <p><strong>Cliente:</strong> {selectedEvent.client}</p>
              <p><strong>Barbero:</strong> {selectedEvent.barber}</p>
              <p><strong>Servicio:</strong> {selectedEvent.service}</p>
              <p><strong>Fecha y Hora:</strong> {formatDateInSpanish(selectedEvent.start)}</p>
              <p><strong>Estado:</strong> {selectedEvent.status.name}</p>
              <p><strong>Comentarios:</strong> {selectedEvent.comments}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {(selectedEvent?.status?.idStatus !== 2 && selectedEvent?.status?.idStatus !== 3)
            &&
            <>
              <Button variant="danger" onClick={() => cancelButton()}>
                Cancelar cita
              </Button>
              <Button variant="success" onClick={() => completeButton()}>
                Cita completada
              </Button>
            </>

          }
          <Button variant="primary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BarberHome;
