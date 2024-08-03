import React, { useState } from 'react'
import UserServices from '../../services/user.service';
import { Link } from 'react-router-dom';
import LoginRegisterForm from '../utils/LoginRegisterForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const iconoLogin = require("../../assets/user.png")
  const initialInputsData = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phone: ""
  };

  const [inputsData, setinputsData] = useState(initialInputsData);
  const [emailError, setEmailError] = useState(false);

  const handleOnChange = (e) => {
    setinputsData({
      ...inputsData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "name") {
      setEmailError(false)
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    async function checkUsuario() {
      try {
        if (inputsData.password !== inputsData.confirmPassword) {
          console.log("no es igual");
          toast.error('Las contraseñas no coinciden', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          return;
        }
        if (inputsData.name === "" || inputsData.name === null || inputsData.name === undefined ) {
          setEmailError(true);
          return
        }
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
      <ToastContainer/>
      <LoginRegisterForm option={"register"} handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} emailError={emailError}/>
    </>
  );
}


export default Register