import React, { useState } from 'react'
import UserServices from '../../services/user.service';
import { Link, useNavigate } from 'react-router-dom';
import LoginRegisterForm from '../utils/LoginRegisterForm';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const initialInputsData = {
    email: "",
    password: "",
  };

  const [inputsData, setinputsData] = useState(initialInputsData);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false)

  const handleOnChange = (e) => {
    setinputsData({
      ...inputsData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      setEmailError(false)
    }
    if (e.target.name === "password") {
      setPasswordError(false)
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    async function checkUsuario() {
      try {
        let error = false
        if (inputsData.email === "" || inputsData.email === null || inputsData.email === undefined) {
          setEmailError(true)
          error = true
        }
        if (inputsData.password === "" || inputsData.password === null || inputsData.password === undefined) {
          setPasswordError(true)
          error = true
        }
        if (error) {
          return
        }
        setIsLoading(true)
        await UserServices.login(inputsData, setToken).then((response) => {
          toast.success(`Se ha iniciado sesión correctamente`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        }).catch((error) => {
          toast.error(`El correo o la contraseña no son correctos`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }).finally(() => {
          setIsLoading(false)
        });
      } catch (error) {
        toast.error(`El correo o la contraseña no son correctos`, {
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
    <>

      <LoginRegisterForm option={"login"} isLoading={isLoading} handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} emailError={emailError} passwordError={passwordError} />
    </>
  );
}

export default Login