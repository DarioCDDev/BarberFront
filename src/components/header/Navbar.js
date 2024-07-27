import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const closeNavbar = () => {
    navRef.current.classList.remove("responsive_nav");
  };

  return (
    <header>
      <h1>JPBarber</h1>
      <nav ref={navRef}>
        <Link to={"/"} onClick={closeNavbar}>Inicio</Link>
        <Link to={"/pedirCita"} onClick={closeNavbar}>Pedir cita</Link>
        <Link to={"/contacto"} onClick={closeNavbar}>Contacto</Link>
        <button
          className="nav-btn nav-close-btn"
          onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button
        className="nav-btn"
        onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
