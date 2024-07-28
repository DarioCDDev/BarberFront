import React from 'react'
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="main-content" style={{ textAlign: 'center' }}>
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, la página que buscas no existe.</p>
    <Link to="/" style={{ textDecoration: 'none', color: '#007BFF' }}>
      Volver a la página principal
    </Link>
  </div>
  );
}
