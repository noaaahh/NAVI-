import React from "react";
import "./ModalLogin.css";

const ModalLogin = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-login-backdrop" onClick={onClose}>
      <div className="modal-login" onClick={e => e.stopPropagation()}>
        <button className="close-x" onClick={onClose} aria-label="Cerrar">×</button>
        <h2 className="modal-title">Iniciar Sesión</h2>
        <div className="modal-warning">Debes iniciar sesión para continuar</div>
            <div className="modal-login-form">
              <label className="modal-label" htmlFor="login-email">Email</label>
              <input id="login-email" className="email" type="text" placeholder="Email" />
              <label className="modal-label" htmlFor="login-password">Contraseña</label>
              <input id="login-password" className="password" type="password" placeholder="Contraseña" />
              <button className="entrar-btn">Ingresar</button>
            </div>
      </div>
    </div>
  );
};

export default ModalLogin;
