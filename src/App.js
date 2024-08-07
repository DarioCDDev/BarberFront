import React from 'react';
import BarberApp from './components/barberApp/BarberApp';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <BarberApp/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;