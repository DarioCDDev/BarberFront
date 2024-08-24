import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MisCitas from '../misCitas/MisCitas';
import UserServices from '../../services/user.service';
import "./Perfil.css";
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Loader from '../utils/Loader';

export const Perfil = ({ user, setUser, token, setToken }) => {

  const defaultUserPhoto = require("../../assets/defaultUserPhoto.png");
  const [selectedFile, setSelectedFile] = useState(null);
  const [userPhoto, setUserPhoto] = useState(defaultUserPhoto);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [originalUserData, setOriginalUserData] = useState({
    name: user.name,
    phone: user.phone
  });
  const [inputDataEdit, setInputDataEdit] = useState({
    name: user.name,
    phone: user.phone,
    confirmPassword: "",
    password: ""
  });

  const [changes, setChanges] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const celarInputs = () => {
    setInputDataEdit({
      name: user.name,
      phone: user.phone,
      confirmPassword: "",
      password: ""
    });
  }

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
        toast.success(`Sesión cerrada con éxito`, {
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
      setIsLoading(true)
      try {
        await UserServices.uploadPhoto(file, user.idUser, token).then((response) => {
        }).catch((error) => {

        }).finally(() => {
          setIsLoading(false)
        });
        getPhoto();
      } catch (error) {
        console.error("Error subiendo la foto:", error);
      }
    }
  }

  const getPhoto = async () => {
    setIsLoading(true)
    try {
      await UserServices.getPhoto(user.idUser, token).then((response) => {
        const blob = new Blob([response.data], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);
        setUserPhoto(url);
      }).catch((error) => {

      }).finally(() => {
        setIsLoading(false)
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setUserPhoto(defaultUserPhoto);
      } else {
        console.error("Error al obtener la foto:", error);
      }
    }
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputDataEdit({
      ...inputDataEdit,
      [name]: value,
    });

    setChanges(true);
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

  const handleConfirmClick = async () => {
    try {
      await UserServices.updateUser(user.idUser, inputDataEdit, token).then((response) => {
        if (response?.status === 200) {
          localStorage.setItem("token", response.data.data)
          toast.success(`Datos actualizados correctamente`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });   
          setUser({
            ...user,
            name: inputDataEdit.name,
            phone: inputDataEdit.phone
          });
          setIsEditing(false);
          celarInputs();
          setChanges(false);  
        }else{
          toast.error(response?.response?.data?.message, {
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
      }).catch((error) => {

      }).finally(() =>{

      });
    } catch (error) {

    }
  };

  useEffect(() => {
    setInputDataEdit({
        name: user.name,
        phone: user.phone,
        confirmPassword: "",
        password: ""
    });
}, [user]);

  const handleCancelClick = () => {
    setInputDataEdit(originalUserData);
    setIsEditing(false);
    setChanges(false);  // Reset changes when canceling
  };

  return (
    <>
      <Loader isLoading={isLoading} />
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
                <span>Nombre y apellido/s: </span>
                {isEditing ?
                  <input
                    onChange={handleOnChange}
                    placeholder="Introduce tu nombre ..."
                    title="Introduce tu nombre"
                    name="name"
                    type="text"
                    className="inputField"
                    value={inputDataEdit.name}
                  />
                  : user.name}
              </p>
              <p>
                <span>Dirección de correo: </span>
                {user.sub}
              </p>
              <p>
                <span>Teléfono: </span>
                {isEditing ?
                  <input
                    onChange={handleOnChange}
                    placeholder="Introduce tu teléfono ..."
                    title="Introduce tu teléfono"
                    name="phone"
                    type="text"
                    className="inputField"
                    value={inputDataEdit.phone}
                  />
                  : user.phone}
              </p>
              {
                isEditing &&
                <>
                  <p>
                    <span>Contraseña actual: </span>
                    <input
                      onChange={handleOnChange}
                      placeholder="Introduce tu contraseña ..."
                      title="Introduce tu contraseña"
                      name="confirmPassword"
                      type="password"
                      className="inputField"
                      value={inputDataEdit.confirmPassword}
                    />
                  </p>
                  <p>
                    <span>Nueva contraseña: </span>
                    <input
                      onChange={handleOnChange}
                      placeholder="Confirma tu contraseña ..."
                      title="Confirma tu contraseña"
                      name="password"
                      type="password"
                      className="inputField"
                      value={inputDataEdit.password}
                    />
                  </p>
                </>
              }
            </div>
            <div>
              {isEditing ? (
                <>
                  <button onClick={handleConfirmClick} disabled={!changes} className={`sign-in_btn sign-in_btn-profile ${!changes && "disabledbtn"}`}>
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
    </>
  );
}
