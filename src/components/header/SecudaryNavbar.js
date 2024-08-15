function SecudaryNavbar() {

  const sections = {
    Inicio: "inicio-section",
    Servicios: "servicios-section",
    Contacto: "contacto-section",
  };

  const handleScroll = (section) => {
    document.getElementById(sections[section]).scrollIntoView({
      behavior: "smooth",
    });
  };


  return (
    <div className="main-content-secundary">
      <span onClick={() => handleScroll("Inicio")}>Inicio</span>
      <span onClick={() => handleScroll("Servicios")}>Servicios</span>
      <span onClick={() => handleScroll("Contacto")}>Contacto</span>
    </div>
  );
}

export default SecudaryNavbar;
