import React from 'react';
import SecudaryNavbar from '../header/SecudaryNavbar';

const Home = () => {
  let array = []
  for (let index = 0; index < 100; index++) {
    array.push(index)
  }
  return (
    <>
      <SecudaryNavbar />
      <div className="main-content-home">
        <h1 id="inicio-section">Inicio</h1>
        {array.map((item) => {
          return(
            <p>hola</p>
          )
        })}
        <h1 id="servicios-section">Servicios</h1>
        <h1 id="contacto-section">Contacto</h1>
      </div>
    </>
  );
};

export default Home;
