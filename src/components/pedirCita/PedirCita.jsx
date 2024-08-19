import React, { useEffect, useState } from 'react';
import PedirCitaServices from '../../services/pedirCita.service';
import './PedirCita.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../utils/Loader';

const PedirCita = ({ token }) => {
  const [barbers, setBarbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBarbers() {
      try {
        setIsLoading(true)
        await PedirCitaServices.getAllBarbers(token).then((response) => {
          setBarbers(response.data);

        }).catch((error) => {
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
        }).finally(() => {
          setIsLoading(false)
        });
      } catch (error) {
      }
    }
    fetchBarbers();
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="main-content">
          <h2>Selecciona a un barbero</h2>
        <div className='container'>
          {barbers?.map((barber, index) => (
            <>
              <div className="card cardBarber" key={index} onClick={() => navigate(`/pedirCita/${barber.userId}/calendar`)}>
                <img alt={`Foto del barber ${barber.name}`} src={`data:image/jpeg;base64,${barber.photo}`} />
              </div>
            </>

          ))}
        </div>
      </div>
    </>
  );
}

export default PedirCita;
