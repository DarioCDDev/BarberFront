import { useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar({ user }) {
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
        {user?.rolId?.idRol === 1 ?
          <>
            <Link to={"/"} onClick={closeNavbar}>Inicio</Link>
            <Link to={"/perfil"} onClick={closeNavbar}>Perfil</Link>
            <Link to={`/pedirCita/${user.idUser}/calendar`} onClick={closeNavbar}>Pedir cita</Link>
          </>
          :
          <>
            <Link to={"/"} onClick={closeNavbar}>Inicio</Link>
            <Link to={"/pedirCita"} onClick={closeNavbar}>Pedir cita</Link>
            {/* <Link to={"/citas"} onClick={closeNavbar}>Mis citas</Link> */}
            {user.sub
              ?
              <Link to={"/perfil"} onClick={closeNavbar}>Perfil</Link>
              :
              <Link to={"/login"} onClick={closeNavbar}>Iniciar Sesión</Link>}

            <button
              className="nav-btn nav-close-btn"
              onClick={showNavbar}>
              <FaTimes />
            </button>
          </>}

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
