import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MisCitas from '../misCitas/MisCitas';
import UserServices from '../../services/user.service';
import "./Perfil.css";
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export const Perfil = ({ user, setUser, token, setToken }) => {

  const defaultUserPhoto = require("../../assets/defaultUserPhoto.png");
  const [selectedFile, setSelectedFile] = useState(null);
  const [userPhoto, setUserPhoto] = useState(defaultUserPhoto); // Establecer foto por defecto
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar si estamos en modo edición
  const [originalUserData, setOriginalUserData] = useState({
    name: user.name,
    phone: user.phone
  });
  const [inputDataEdit, setInputDataEdit] = useState({
    name: user.name,
    phone: user.phone
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.idUser && token) {
      getPhoto();
    }
  }, [user, token]);

  const logout = () => {
    setUser([]);
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  }

  const warningLogout = () => {
    Swal.fire({
      title: "¿Seguro que quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, cerrar sesión"
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        toast.success(`Sesión cerrada con exito`, {
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
    });
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      try {
        await UserServices.uploadPhoto(file, user.idUser, token);
        getPhoto();
      } catch (error) {
        console.error("Error subiendo la foto:", error);
      }
    }
  }

  const getPhoto = async () => {
    try {
      const response = await UserServices.getPhoto(user.idUser, token);
      const blob = new Blob([response.data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      setUserPhoto(url);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setUserPhoto(defaultUserPhoto);
      } else {
        console.error("Error al obtener la foto:", error);
      }
    }
  }

  const handleOnChange = (e) => {
    setInputDataEdit({
      ...inputDataEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleEditClick = () => {
    setOriginalUserData({
      name: inputDataEdit.name,
      phone: inputDataEdit.phone
    });
    setIsEditing(true);
  };

  //HACER LE UPDATE USERRRRR
  
  const handleConfirmClick = async () => {
    try {
      await UserServices.updateUser(user.idUser, inputDataEdit, token);
      setUser({
        ...user,
        name: inputDataEdit.name,
        phone: inputDataEdit.phone
      });
      setIsEditing(false);
      toast.success(`Datos actualizados con éxito`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error actualizando los datos:", error);
    }
  };

  const handleCancelClick = () => {
    setInputDataEdit(originalUserData);
    setIsEditing(false);
  };

  return (
    <div className="main-content">
      <div className='profileContainer'>
        <div>
          <div>
            <img
              onClick={handleImageClick}
              className="photoProfile"
              alt={`Foto de perfil de ${user.name}`}
              src={userPhoto}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className='infoProfile'>
          <div className='input_container'>
            <p>
              <span>Nombre:</span>
              {isEditing ?
                <input
                  onChange={handleOnChange}
                  placeholder="Introduce tu nombre ..."
                  title="Introduce tu nombre"
                  name="name"
                  type="text"
                  className="input_field"
                  value={inputDataEdit.name}
                />
                : user.name}
            </p>
            <p>
              <span>Dirección de correo:</span>
              {user.sub}
            </p>
            <p>
              <span>Teléfono:</span>
              {isEditing ?
                <input
                  onChange={handleOnChange}
                  placeholder="Introduce tu teléfono ..."
                  title="Introduce tu teléfono"
                  name="phone"
                  type="text"
                  className="input_field"
                  value={inputDataEdit.phone}
                />
                : user.phone}
            </p>
          </div>
          <div>
            {isEditing ? (
              <>
                <button onClick={handleConfirmClick} className="sign-in_btn sign-in_btn-profile">
                  Confirmar
                </button>
                <button onClick={handleCancelClick} className="sign-in_apl sign-in_apl-profile">
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button onClick={handleEditClick} className="sign-in_btn sign-in_btn-profile">
                  Modificar datos
                </button>
                <button onClick={() => warningLogout()} className="sign-in_apl sign-in_apl-profile">
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <MisCitas user={user} token={token} />
    </div>
  );
}
