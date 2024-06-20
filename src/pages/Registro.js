import React from 'react';
import '../css/login.css'
import 'bootstrap/dist/css/bootstrap.css';

function Registro() {
  return (
    <div className="container">
      <div className="login-container">
        <h2 className="text-center">Login</h2>
        <form>
          <div className="mb-3 mt-2">
            <label htmlFor="email" className="form-label">Dirección de correo</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrarme</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;