import React from 'react';
import Navbar from './components/header/Navbar';
import BarberApp from './components/barberApp/BarberApp';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <BarberApp/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;