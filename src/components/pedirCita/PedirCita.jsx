import React, { useEffect, useState } from 'react';
import PedirCitaServices from '../../services/pedirCita.service';
import './PedirCita.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PedirCita = ({token}) => {
  const [barbers, setBarbers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBarbers() {
      try {
        const response = await PedirCitaServices.getAllBarbers(token);
        setBarbers(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/login")
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
      }
    }
    fetchBarbers();
  }, []);

  return (
    <div className="main-content">
      <div className='container'>
        {barbers?.map((barber, index) => (
          <>
            <div className="card" key={index} onClick={() =>  navigate(`/pedirCita/${barber.userId}/calendar`)}>
              <img alt={`Foto del barber ${barber.name}`} src={`data:image/jpeg;base64,${barber.photo}`} />
            </div>
          </>

        ))}
      </div>
    </div>
  );
}

export default PedirCita;
