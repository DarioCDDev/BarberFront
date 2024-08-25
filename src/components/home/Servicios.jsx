import React, { useEffect, useState } from 'react'
import PedirCitaServices from '../../services/pedirCita.service'
import Loader from '../utils/Loader'

const Servicios = () => {
  const [barbers, setBarber] = useState([])
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAllBarbersPublic = async () => {
    setIsLoading(true)
    await PedirCitaServices.getAllBarbersPublic().then((response) => {
      const sortedBarbers = response.data.sort((a, b) => a.userId - b.userId);
      console.log(sortedBarbers);
      
      setBarber(sortedBarbers)
    }).catch((error) => {

    }).finally(() => {
      setIsLoading(false)
    })
  }
  const getAllServices = async () => {

    await PedirCitaServices.getAllServices().then((response) => {
      const sortedServices = response.data.sort((a, b) => a.idService - b.idService);
      setServices(sortedServices)

    }).catch((error) => {

    })

  }
  useEffect(() => {
    getAllBarbersPublic()
    getAllServices()
  }, [])

  return (
    <section id="servicios-section" className="sectionServiceContainer">
      <Loader isLoading={isLoading} goingToTake={true}/>
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