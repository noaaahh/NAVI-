import React, { useState } from "react";
import "./Registro.css";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import ModalLogin from "./ModalLogin";

const Registro = ({ onBack, onGoRegistroPersonal, onGoInicioUsuario }) => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="registro">
      <section className="registro__hero">
        <nav className="registro__nav">
          <button className="registro__btn" onClick={() => setShowLogin(true)}>Iniciar sesión</button>
          <button className="registro__btn registro__btn--primary" onClick={onBack}>Inicio</button>
        </nav>
        <img
          className="registro__hero-img"
          src="https://i.imgur.com/XhHkOp3.png"
          alt="Piso táctil accesibilidad"
        />
        <h1 className="registro__hero-title">¡Unite a nuestra comunidad!!</h1>
      </section>

      <section className="registro__selector">
        <div className="registro__selector-intro">
          <h2>
            Selecciona el tipo de registro que se ajuste a tu perfil.
          </h2>
          <div className="registro__hand" aria-hidden="true">
            <img src="https://i.imgur.com/5NTE4aI.png" alt="Accesibilidad" />
          </div>
        </div>

        <div className="registro__selector-options">
          <button className="registro__option" onClick={onGoRegistroPersonal}>
            <span className="registro__option-label">
              <span className="registro__option-title">Registro personal</span>
              <span className="registro__option-subtitle">Registrate y empeza a calificar tus lugares favoritos.</span>
            </span>
            <span className="registro__option-right">
              <span className="registro__dot" />
              <HiOutlineArrowNarrowRight />
            </span>
          </button>
          <button className="registro__option">
            <span className="registro__option-label">
              <span className="registro__option-title">Registro empresarial</span>
              <span className="registro__option-subtitle">Registra tu empresa y sé parte de SAVI, Iniciondonos a construir accesibilidad para todos.</span>
            </span>
            <span className="registro__option-right">
              <span className="registro__dot" />
              <HiOutlineArrowNarrowRight />
            </span>
          </button>
        </div>
      </section>

      <footer className="registro__footer">
        <div className="registro__footer-left">
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
          <a href="#" aria-label="Email"><MdMailOutline /></a>
        </div>
        <div className="registro__footer-right">
          <span>Contacto: 091 222 333 — savi@gmail.com.uy</span>
        </div>
      </footer>
      <ModalLogin isOpen={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={onGoInicioUsuario} />
    </div>
  );
};

export default Registro;


