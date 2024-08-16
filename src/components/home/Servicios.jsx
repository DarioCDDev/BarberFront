import React, { useEffect, useState } from 'react'
import PedirCitaServices from '../../services/pedirCita.service'

const Servicios = () => {
  const [barbers, setBarber] = useState([])
  const [services, setServices] = useState([])

  const getAllBarbersPublic = async () => {
    await PedirCitaServices.getAllBarbersPublic().then((response) => {
      setBarber(response.data)
      console.log(response);
    }).catch((error) => {

    })
  }
  const getAllServices = async () => {

    await PedirCitaServices.getAllServices().then((response) => {
      console.log(response.data);
      setServices(response.data)

    }).catch((error) => {
      console.log(error);

    })

  }
  useEffect(() => {
    getAllBarbersPublic()
    getAllServices()
  }, [])

  return (
    <section id="servicios-section" className="sectionServiceContainer">
      <div style={{flex: "1"}}>
        <h2>Barberos</h2>
        <div className='serviceContainer'>
          <div className='serviceContainerCards '>
            {barbers?.map((barber, index) => (
              <>
                <div className="card cardBarber" key={index}>
                  <img className="barberPhoto" alt={`Foto del barber ${barber.name}`} src={`data:image/jpeg;base64,${barber.photo}`} />
                </div>
              </>

            ))}
          </div>
        </div>
      </div>
      <div style={{flex: "1"}}>
        <h2>Servicios que ofrecemos</h2>
        <div className='serviceContainer'>
          {services.map((services, index) => {
            return (
              <div key={index} className='serviceDataContainer'>
                <span className='serviceDataContainerSpan'>{services.name}</span>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
                  <span>{services.price}€</span>
                  <span className='note' style={{ textDecoration: "none" }}>30 min</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Servicios