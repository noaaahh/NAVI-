import React from "react";
import "./Registro.css";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const Registro = ({ onBack }) => {
  return (
    <div className="registro">
      <section className="registro__hero">
        <nav className="registro__nav">
          <button className="registro__btn">Iniciar sesión</button>
          <button className="registro__btn registro__btn--primary">Ayuda</button>
          <button className="registro__btn" onClick={onBack}>Volver atrás</button>
        </nav>
        <img
          className="registro__hero-img"
          src="https://i.imgur.com/XhHkOp3.png"
          alt="Piso táctil accesibilidad"
        />
        <h1 className="registro__hero-title">¡Bienvenido!</h1>
      </section>

      <section className="registro__cards">
        <div className="registro__cards-bg" />
        <div className="registro__card">
          <h3>USUARIO PERSONAL</h3>
          <p>
            Consulta y califica a tus lugares favoritos para comer, ¡Nos
            interesa mucho tu opinión!
          </p>
        </div>
        <div className="registro__card">
          <h3> USUARIO EMPRESARIAL</h3>
          <p>
            Registra tu empresa y sé parte de SAVI, ayudándonos a construir
            accesibilidad para todos.
          </p>
        </div>
      </section>

      <section className="registro__selector">
        <div className="registro__selector-intro">
          <h2>
            Selecciona el tipo de registro que se ajuste a tu perfil.
          </h2>
          <div className="registro__hand" aria-hidden="true">
            <img src="https://i.imgur.com/n2D1rOn.png" alt="Accesibilidad" />
          </div>
        </div>

        <div className="registro__selector-options">
          <button className="registro__option">
            <span>Registro personal</span>
            <span className="registro__option-right">
              <span className="registro__dot" />
              <HiOutlineArrowNarrowRight />
            </span>
          </button>
          <button className="registro__option">
            <span>Registro empresarial</span>
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
    </div>
  );
};

export default Registro;


