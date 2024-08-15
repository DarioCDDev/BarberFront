import React from 'react';

const Contacto = () => {
  return (
    <section id="contacto-section" style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Contacto</h2>
      <p>Teléfono: <a href="tel:+1234567890">+1 234 567 890</a></p>
      <p>Email: <a href="mailto:info@savierbarber.com">jpbarber@gmail.com</a></p>
      <div style={{ marginTop: '20px' }}>
        <h3>Encuéntranos en Google Maps</h3>
        <iframe
          title="Google Maps"
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.4781473134626!2d-16.280084923988063!3d28.465143591661455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc41cdc872db4051%3A0xc3cb6583aff094ea!2sPeluquer%C3%ADa%20Savier%20Barber!5e0!3m2!1ses!2ses!4v1723736731041!5m2!1ses!2ses`}
          width="800"
          height="600"
          style={{ border: '0', borderRadius: '10px' }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}

export default Contacto;
