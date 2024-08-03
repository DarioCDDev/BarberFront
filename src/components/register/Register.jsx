import React, { useState } from 'react'
import UserServices from '../../services/user.service';
import { Link, useNavigate } from 'react-router-dom';
import LoginRegisterForm from '../utils/LoginRegisterForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const initialInputsData = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phone: ""
  };

  const [inputsData, setinputsData] = useState(initialInputsData);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setinputsData({
      ...inputsData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "name") {
      setNameError(false)
    }
    if (e.target.name === "email") {
      setEmailError(false)
    }
    if (e.target.name === "phone") {
      setPhoneError(false)
    }
    if (e.target.name === "password") {
      setPasswordError(false)
    }
    if (e.target.name === "confirmPassword") {
      setConfirmPasswordError(false)
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    async function checkUsuario() {
      try {
        let error = false

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
        if (inputsData.name === "" || inputsData.name === null || inputsData.name === undefined) {
          setNameError(true);
          error = true
        }
        if (inputsData.email === "" || inputsData.email === null || inputsData.email === undefined) {
          setEmailError(true)
          error = true
        }
        if (inputsData.phone === "" || inputsData.phone === null || inputsData.phone === undefined) {
          setPhoneError(true)
          error = true
        }
        if (inputsData.password === "" || inputsData.password === null || inputsData.password === undefined) {
          setPasswordError(true)
          error = true
        }
        if (inputsData.confirmPassword === "" || inputsData.confirmPassword === null || inputsData.confirmPassword === undefined) {
          setConfirmPasswordError(true)
          error = true
        }
        if (error) {
          return
        }
        console.log(inputsData);
        await UserServices.register(inputsData).then((response) => {
          toast.success(`Cuenta creada correctamente`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/")
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          console.log("final");
        });
      } catch (error) {
        toast.error(`Ha ocurrido un error, intento de nueevo`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    checkUsuario();
  };

  return (
    <LoginRegisterForm option={"register"} handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} nameError={nameError} emailError={emailError} phoneError={phoneError} passwordError={passwordError} confirmPasswordError={confirmPasswordError} />
  );
}


export default Register