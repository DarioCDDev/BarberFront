import React from 'react';
import Navbar from './components/header/Navbar';
import Home from './components/home/Home';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Home />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;