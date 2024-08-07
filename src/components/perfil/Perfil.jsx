import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MisCitas from '../misCitas/MisCitas';
import UserServices from '../../services/user.service';
import "./Perfil.css";

export const Perfil = ({ user, setUser, token, setToken }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userPhoto, setUserPhoto] = useState("");
  const fileInputRef = useRef(null); // Referencia al input de archivo
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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      try {
        await UserServices.uploadPhoto(file, user.idUser, token);
        
        getPhoto(); // Actualiza la foto después de la subida
      } catch (error) {
        console.error("Error subiendo la foto:", error);
      }
    }
  }

  const getPhoto = async () => {
    try {
      const response = await UserServices.getPhoto(user.idUser, token);
      console.log(response.data); // Verifica el contenido de response.data

      // Convertir ArrayBuffer a URL de imagen
      const blob = new Blob([response.data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      setUserPhoto(url);
    } catch (error) {
      console.error("Error obteniendo la foto:", error);
    }
  }

  const handleImageClick = () => {
    // Simula un clic en el input de archivo
    fileInputRef.current.click();
  };

  return (
    <div className="main-content">
      <div className='profileContainer'>
        <div>
          {userPhoto ? (
            <div>
              <img
                onClick={handleImageClick} // Manejador de clic en la imagen
                className="photoProfile"
                alt={`Foto de perfil de ${user.name}`}
                src={userPhoto}
              />
              <input
                type="file"
                ref={fileInputRef} // Asocia la referencia al input de archivo
                onChange={handleFileChange}
                style={{ display: 'none' }} // Oculta el input de archivo
              />
            </div>
          ) : (
            <div>
              <input
                type="file"
                ref={fileInputRef} // Asocia la referencia al input de archivo
                onChange={handleFileChange}
                style={{ display: 'none' }} // Oculta el input de archivo
              />
              {/* Botón eliminado ya que la carga es automática */}
            </div>
          )}
        </div>
        <div className='infoProfile'>
          <p><span>Nombre:</span> {user.name}</p>
          <p><span>Dirección de correo:</span> {user.sub}</p>
          <p><span>Teléfono:</span> {user.phone}</p>
        </div>
      </div>
      <div style={{ width: "80%" }}>
        <h4>Mis Citas:</h4>
      </div>
      <MisCitas user={user} token={token} />
    </div>
  );
}
