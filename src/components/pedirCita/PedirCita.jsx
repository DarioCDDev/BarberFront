import React, { useEffect, useState } from 'react';
import PedirCitaServices from '../../services/pedirCita.service';
import './PedirCita.css';
import { useNavigate } from 'react-router-dom';

const PedirCita = () => {
  const [barbers, setBarbers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBarbers() {
      try {
        const data = await PedirCitaServices.getAllBarbers();
        setBarbers(data.data);
      } catch (error) {
        console.log(error);
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
