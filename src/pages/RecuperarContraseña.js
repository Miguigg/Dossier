import React, { useState } from 'react';
import { getAuth , sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import validarLogin from '../utils/validadores/validadorLogin';
import ComponenteModal from '../components/ComponenteModal';

import '../css/landing.css'
import '../css/login.css'
import 'bootstrap/dist/css/bootstrap.css';

function RecuerarPass(){
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleShow = () => setShow(true);

    const handleRedirect = () => {
        navigate('/home');
      };

    const handleShowAlert = () => {
        handleShow()
    };

    const handleClose = () => {
        setShow(false)
        handleRedirect()
    };

    const auth = getAuth();
    const recPass = (e) => {
        e.preventDefault();
        if(validarLogin(email)){
            sendPasswordResetEmail(auth, email)
            .then(() => {
                handleShowAlert()
            })
            .catch((error) => {
            });
        }
    }
    return(
        <div className="container">
        <div className="login-container gradient-bg-landing">
          <h2 className="text-center text-color">Login</h2>
          <form onSubmit={recPass}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label mt-2 text-color">Dirección de correo</label>
              <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)} id="email" placeholder="Enter your email" />
              <div id="errEmail" style={{display: "none", color: "red"}}>
              *Debes introducir un email válido "miguel@gmail.com"
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3 text-color">Recuperar contraseña</button>
          </form>
        </div>
        <ComponenteModal show={show} handleClose={handleClose} msg="Si el correo es correcto, recibirás un correo para recuperar la contraseña" />
      </div>
    );
}

export default RecuerarPass