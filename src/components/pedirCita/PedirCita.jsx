import React, { useEffect, useState } from 'react';
import PedirCitaServices from '../../services/pedirCita.service';
import './PedirCita.css';
import barberImage from '../../assets/barber.webp';

const PedirCita = () => {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    async function fetchBarbers() {
      try {
        const data = await PedirCitaServices.getAllBarbers();
        setBarbers(data.data);
        console.log(data);
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
          <div className="card" key={index}>
            <img alt='Foto del barbero' src={barberImage} />
          </div>
          </>
          
        ))}
      </div>
    </div>
  );
}

export default PedirCita;
