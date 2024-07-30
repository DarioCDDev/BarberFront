import React, { useState } from 'react'
import UserServices from '../../services/user.service';
import { Link } from 'react-router-dom';

const Register = () => {
  
  const iconoLogin = require("../../assets/user.png")
  const initialInputsData = {
    email: "",
    name : "",
    password: "",
    phone: ""
  };

  const [inputsData, setinputsData] = useState(initialInputsData);

  const handleOnChange = (e) => {
    setinputsData({
      ...inputsData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    async function checkUsuario() {
      try {
        console.log(inputsData);
        const response = await UserServices.register(inputsData);
        console.log(response);
      } catch (error) {
        console.log("error");
        console.log(error.config.headers);
      }
    }
    checkUsuario();
  };

  return (
    <>
      <div className="loginContainer">
        <form className="formularioLogin" onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor="email" className="text-secondary">
              EMAIL
            </label>
            <div>
              <input id="email" name="email" type="email" placeholder="" required="" className="formularioLoginInput" onChange={handleOnChange} />
            </div>
          </div>
          <div className="">
            <label htmlFor="name" className="text-secondary">
              Nombre
            </label>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                placeholder=""
                required=""
                className="formularioLoginInput"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="phone" className="text-secondary">
              Teléfono
            </label>
            <div>
              <input
                id="phone"
                name="phone"
                type="number"
                placeholder=""
                required=""
                className="formularioLoginInput"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="password" className="text-secondary">
              CONTRASEÑA
            </label>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder=""
                required=""
                className="formularioLoginInput"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary mt-4 w-100">
              <img className="iconoBotonLogin mr-5" src={iconoLogin} alt="" />
              <b style={{ color: "white" }}>INICIAR SESIÓN</b>
            </button>
          </div>
          <hr />
          <div className="text-center">
            <p className="mb-0">¿Todavia no tienes cuenta?</p>
            <Link to={"/login"} className="registerLink">
              <b>login aquí</b>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}


export default Register