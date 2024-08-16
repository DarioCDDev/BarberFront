import React, { useEffect, useState } from 'react';
import PedirCitaServices from '../../services/pedirCita.service';
import { Carousel } from 'react-bootstrap';


const Inicio = () => {
  const photo1 = require("../../assets/Vin-diesel.webp")
  const photo2 = require("../../assets/barber.webp")
  return (
    <div id="inicio-section">
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src={photo1}
            alt="First slide"
            style={{ width: '800px', height: '400px', objectFit: 'cover' }}
          />
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src={photo2}
            alt="Second slide"
            style={{ width: '800px', height: '400px', objectFit: 'cover' }}
          />
          {/* <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        {/* <Carousel.Item>
          <img
            className="d-block w-100"
            src="url_de_tu_tercera_imagen.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>
      <div className="intro-barberia">
        <h2>Bienvenido a Nuestra Barbería</h2>
        <p>
          En nuestra barbería, ofrecemos una experiencia única donde el estilo y la tradición se encuentran.
          Nuestros barberos expertos están dedicados a proporcionar cortes de cabello de alta calidad,
          afeitados clásicos y un ambiente acogedor.
          ¡Visítanos para un corte impecable y un servicio de primera clase!
        </p>
      </div>
    </div>
  );
};

export default Inicio;
