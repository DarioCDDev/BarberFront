import React, { useState } from 'react'
import UserServices from '../../services/user.service';
import { Link } from 'react-router-dom';
import LoginRegisterForm from '../utils/LoginRegisterForm';

const Login = () => {

  const iconoLogin = require("../../assets/user.png")
  const initialInputsData = {
    email: "",
    password: "",
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
      console.log(inputsData);
      try {
        const response = await UserServices.login(inputsData);
        console.log(response);
      } catch (error) {
        console.log("error");
        console.log(error.config.headers);
      }
    }
    checkUsuario();
  };

  return (
    <LoginRegisterForm option={"login"} handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} />
  );
}

export default Login