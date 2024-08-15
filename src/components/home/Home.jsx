import React from 'react';
import SecudaryNavbar from '../header/SecudaryNavbar';
import Inicio from './Inicio';
import Servicios from './Servicios';
import Contacto from './Contacto';

const Home = () => {
  return (
    <>
      <SecudaryNavbar />
      <div className="main-content-home">
        <Inicio/>
        <Servicios/>
        <Contacto/>
      </div>
    </>
  );
};

export default Home;
