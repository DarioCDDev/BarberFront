import React, { useState } from 'react'
import './LoginRegisterForm.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const LoginRegisterForm = ({ option, handleOnChange, handleOnSubmit, nameError, emailError, phoneError, passwordError, confirmPasswordError }) => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className={option === "register" ? "formContainer formContainerRegister" : "formContainer"}>
      <form className="form_container" onSubmit={handleOnSubmit}>
        <div className="title_container">
          <span className="title">{option === "register" ? "Registrate con tu correo" : "Inicia sesión con tu cuenta"}</span>
          <span className="subtitle">Comience con nuestra aplicación, simplemente cree una cuenta y disfrute de la experiencia.</span>
        </div>
        <br />
        {option === "register" &&
          <div className="input_container">
            {
              nameError ?
                <>
                  <label className="labelError" for="name">EL NOMBRE ES OBLIGATORIO</label>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                  <input onChange={handleOnChange} placeholder="Introduce tu nombre ..." title="Introduce tu nombre aquí" name="name" type="text" className="input_field_error" id="name" />
                </>
                :
                <>
                  <label className="input_label" for="name">Nombre </label>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                  <input onChange={handleOnChange} placeholder="Introduce tu nombre ..." title="Introduce tu nombre aquí" name="name" type="text" className="input_field" id="name" />
                </>
            }
          </div>
          
        }
        <div className="input_container">
          {
            emailError ?
              <>
                <label className="labelError" for="email">EL CORREO ES OBLIGATORIO</label>
                <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                  <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="red" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                  <path stroke-linejoin="round" stroke-width="1.5" stroke="red" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
                </svg>
                <input onChange={handleOnChange} placeholder="Introduce tu correo ..." title="Introduce tu correo aquí" name="email" type="email" className="input_field_error" id="email" />
              </>
              :
              <>
                <label className="input_label" for="email">Correo</label>
                <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon" >
                  <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                  <path stroke-linejoin="round" stroke-width="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
                </svg>
                <input onChange={handleOnChange} placeholder="Introduce tu correo ..." title="Introduce tu correo aquí" name="email" type="email" className="input_field" id="email" />

              </>
          }
        </div>
        {
          option === "register" &&
          <div className="input_container">
            {phoneError ?
              <>
                <label className="labelError" for="phone">EL TELÉFONO ES OBLIGATORIO</label>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-phone">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                </svg>
                <input onChange={handleOnChange} placeholder="Introduce tu teléfono ..." title="Introduce tu teléfono aquí" name="phone" type="text" className="input_field_error" id="phone" />
              </>
              :
              <>
                <label className="input_label" for="phone">Teléfono</label>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-phone">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                </svg>
                <input onChange={handleOnChange} placeholder="Introduce tu teléfono ..." title="Introduce tu teléfono aquí" name="phone" type="text" className="input_field" id="phone" />
              </>
            }
          </div>
        }
        <div className="input_container">
          {
            passwordError ?
              <>
                <label className="labelError" for="password">LA CONTRASEÑA ES OBLIGATORIA</label>
                {passwordVisible
                  ?
                  <svg onClick={() => togglePasswordVisibility()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-lock-open"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 11m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" /><path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M8 11v-5a4 4 0 0 1 8 0" /></svg>
                  :
                  <svg onClick={() => togglePasswordVisibility()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-lock-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 11h2a2 2 0 0 1 2 2v2m0 4a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h4" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-3m.719 -3.289a4 4 0 0 1 7.281 2.289v4" /><path d="M3 3l18 18" /></svg>
                }

                <input onChange={handleOnChange} placeholder="Introduce tu contraseña ..." title="Introduce tu contraseña aquí" name="password" type={passwordVisible ? "text" : "password"} className="input_field_error" id="password" />
              </>
              :
              <>
                <label className="input_label" for="password">Contraseña</label>
                {passwordVisible
                  ?
                  <svg onClick={() => togglePasswordVisibility()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-lock-open"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 11m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" /><path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M8 11v-5a4 4 0 0 1 8 0" /></svg>
                  :
                  <svg onClick={() => togglePasswordVisibility()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-lock-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 11h2a2 2 0 0 1 2 2v2m0 4a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h4" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-3m.719 -3.289a4 4 0 0 1 7.281 2.289v4" /><path d="M3 3l18 18" /></svg>
                }

                <input onChange={handleOnChange} placeholder="Introduce tu contraseña ..." title="Introduce tu contraseña aquí" name="password" type={passwordVisible ? "text" : "password"} className="input_field" id="password" />
              </>
          }

        </div>
        {
          option === "register" &&
          <div className="input_container">
            {
              confirmPasswordError ?
                <>
                  <label className="labelError" for="confirmPassword">Confirma la contraseña</label>
                  {confirmPasswordVisible
                    ?
                    <svg onClick={() => toggleConfirmPasswordVisibility()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-lock-open"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 11m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" /><path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M8 11v-5a4 4 0 0 1 8 0" /></svg>
                    :
                    <svg onClick={() => toggleConfirmPasswordVisibility()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-lock-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 11h2a2 2 0 0 1 2 2v2m0 4a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h4" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-3m.719 -3.289a4 4 0 0 1 7.281 2.289v4" /><path d="M3 3l18 18" /></svg>
                  }
                  <input onChange={handleOnChange} placeholder="Confirme su contraseña ..." title="Reintroduce tu contraseña aquí" name="confirmPassword" type={confirmPasswordVisible ? "text" : "password"} className="input_field_error" id="confirmPassword" />
                </>
                :
                <>
                  <label className="input_label" for="confirmPassword">Confirma la contraseña</label>
                  {confirmPasswordVisible
                    ?
                    <svg onClick={() => toggleConfirmPasswordVisibility()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-lock-open"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 11m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" /><path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M8 11v-5a4 4 0 0 1 8 0" /></svg>
                    :
                    <svg onClick={() => toggleConfirmPasswordVisibility()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-lock-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 11h2a2 2 0 0 1 2 2v2m0 4a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h4" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-3m.719 -3.289a4 4 0 0 1 7.281 2.289v4" /><path d="M3 3l18 18" /></svg>
                  }
                  <input onChange={handleOnChange} placeholder="Confirme su contraseña ..." title="Reintroduce tu contraseña aquí" name="confirmPassword" type={confirmPasswordVisible ? "text" : "password"} className="input_field" id="confirmPassword" />
                </>
            }
          </div>
        }
        {
          option === "register"
            ?
            <>
              <button title="Sign In" type="submit" className="sign-in_btn">
                <span>Registrate</span>
              </button>

              <div className="separator">
                <hr className="line" />
                <span>O</span>
                <hr className="line" />
              </div>
              <span className="note">¿Ya tienes cuenta? Haz click en el botón para Iniciar sesión</span>
              <button title="Sign In" type="submit" className="sign-in_apl">
                <Link to={"/login"} className="registerLink">Inicia sesión aquí</Link>
              </button>
            </>
            :
            <>
              <button title="Sign In" type="submit" className="sign-in_btn">
                <span>Iniciar sesión</span>
              </button>

              <div className="separator">
                <hr className="line" />
                <span>O</span>
                <hr className="line" />
              </div>
              <span className="note">¿No tienes cuenta? Haz click en el botón para registrarte</span>
              <button title="Sign In" type="submit" className="sign-in_apl">
                <Link to={"/register"} className="registerLink">Registrate aquí</Link>
              </button>
            </>
        }

      </form >
    </div >
  );
}

export default LoginRegisterForm