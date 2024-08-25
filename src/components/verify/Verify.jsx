import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserServices from '../../services/user.service';
import Loader from '../utils/Loader';
import Swal from 'sweetalert2';

const Verify = ({ user, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState([]);
  const [codeError, setCodeError] = useState(false);
  let contador = 0

  const navigate = useNavigate();

  const deleteUser = async () => {
    await UserServices.deleteUser(user.idUser, token).then((response) => {
      toast.success("Cuenta eliminada con éxito", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.clear();
      window.location.reload();
    });
  };

  const handleOnChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const resendCode = async (e) => {
    e.preventDefault();
    await UserServices.resendCode(user.sub, token).then((response) => {
      contador += 1
      if (contador > 1) {
        Swal.fire({
          title: "Es posible que el correo introducido no exista",
          text: `Hemos enviado varias veces el correo de vrificación a: ${user.sub}. Si está seguro de que es su correo, póngase en contacto con nosotros enviando un correo a [cuenta]. En caso contrario, si se confundió al introducir el correo, haga clic en 'Cerrar cuenta'.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Cerrar cuenta"
        }).then(async (result) => {
          if (result.isConfirmed) {
            await deleteUser();
          }
        });
        return
      }
      toast.success("Código reenviado exitosamente", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }).catch((error) => {
      Swal.fire({
        title: "Es posible que el correo introducido no exista",
        text: `No encontramos ninguna cuenta asociada a este correo: ${user.sub}. Si está seguro de que es su correo, póngase en contacto con nosotros enviando un correo a [cuenta]. En caso contrario, si se confundió al introducir el correo, haga clic en 'Cerrar cuenta'.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Cerrar cuenta"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteUser();
        }
      });
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    async function checkUsuario() {
      try {
        let error = false;

        if (!inputData.code) {
          setCodeError(true);
          error = true;
        }
        if (error) {
          return;
        }
        setIsLoading(true);
        await UserServices.verifyAccount(user.sub, inputData.code, token).then((response) => {
          toast.success("Cuenta verificada correctamente", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          localStorage.clear();
          localStorage.setItem("token", response.data.token);
          window.location.reload();
        }).catch((error) => {
          toast.error(error.response.data, {
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
          setIsLoading(false);
        });
      } catch (error) {
        toast.error("Ha ocurrido un error, por favor intente de nuevo", {
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
      <Loader isLoading={isLoading} />
      <div className="formContainer">
        <form className="form_container" onSubmit={handleOnSubmit}>
          <div className="title_container">
            <span className="title">Verifique su cuenta</span>
            <span className="subtitle">Revise su bandeja de entrada, debería recibir un código en breves instantes</span>
            <span className="note" style={{ cursor: "pointer" }} onClick={(e) => resendCode(e)}>Reenviar código</span>
          </div>
          <br />
          <div className="input_container">
            <label className="input_label" htmlFor="code">Código</label>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-outline icon-tabler-device-mobile-message">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M11 3h10v8h-3l-4 2v-2h-3z" />
              <path d="M15 16v4a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1h2" />
              <path d="M10 18v.01" />
            </svg>
            <input onChange={handleOnChange} placeholder="Introduzca el código aquí ..." title="Introduzca el código aquí" name="code" type="text" className="input_field" id="code" />
          </div>
          <button title="Sign In" type="submit" className="sign-in_btn">
            <span>Enviar</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Verify;
