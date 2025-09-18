import React, { useState } from "react";
import ModalLogin from "./ModalLogin";
import "./Inicio.css";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

const Inicio = ({ onGoRegistro }) => {
  const [open, setOpen] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const toggle = (i) => {
    setOpen(open === i ? null : i);
  };

  return (
    <div className="inicio">

      <section className="hero">
        <div className="nav-links">
          <button onClick={() => setShowLogin(true)}>Iniciar sesión</button>
          <button onClick={onGoRegistro}>Registrarse</button>
        </div>
        <div className="logo-title">
          <img src="https://i.imgur.com/5MlZOKV.png" alt="Logo SAVI" className="logo" />
          <h1 className="logo-title__title">S A V I</h1>
        </div>
        <p>
          Conectamos a las personas con locales gastronómicos accesibles,
          calificaciones reales y un sello de certificación que impulsa la
          inclusión.
        </p>
      </section>

      <section className="opciones">
        <h2>Algunas de nuestras opciones:</h2>
        <div className="cards">
          <div className="card">
            <img src="https://i.imgur.com/ZifMmLa.jpeg" alt="Opción 1" />
            <div className="card-overlay">
              <p>Domino´s pizza</p>
              <p>Poctitos</p>
              <p>Rampa</p>
            </div>
          </div>
          <div className="card">
            <img src="https://i.imgur.com/ZifMmLa.jpeg" alt="Opción 2" />
            <div className="card-overlay">
              <p>Domino´s pizza</p>
              <p>Poctitos</p>
              <p>Rampa</p>
            </div>
          </div>
          <div className="card">
            <img src="https://i.imgur.com/ZifMmLa.jpeg" alt="Opción 3" />
            <div className="card-overlay">
              <p>Domino´s pizza</p>
              <p>Poctitos</p>
              <p>Rampa</p>
            </div>
          </div>
        </div>
      </section>

      <section className="quienes-somos">
        <div className="texto">
          <h2>¿Quiénes somos?</h2>
            <p> Nuestro equipo SAVI está conformado por 9 integrantes </p>
          <div className="faq">
            <div onClick={() => toggle(1)} className="faq-item">
              <h3>¿Quiénes somos?</h3>
              {open === 1 && <p>S.A.V.I. es un proyecto creado en Montevideo para mejorar cómo las grandes
                 empresas y cadenas gestionan la accesibilidad de sus espacios. Inspirado en N.A.V.I., busca eliminar barreras físicas, sensoriales y comunicacionales para personas con discapacidad.</p>}
            </div>
            <div onClick={() => toggle(2)} className="faq-item">
              <h3>¿Qué hacemos?</h3>
              {open === 2 && <p>El proyecto busca establecer un estándar corporativo de accesibilidad en grandes empresas y cadenas de Montevideo. Con S.A.V.I., las compañías podrán registrar, verificar y comunicar la accesibilidad de sus locales, evitando la frustración de las personas con discapacidad al encontrar espacios no adaptados.</p>}
            </div>
            <div onClick={() => toggle(3)} className="faq-item">
              <h3>¿Cómo contactarnos?</h3>
              {open === 3 && <p>Puedes escribirnos a nuestro mail: savi@gmail.com.uy o a través de nuestras redes sociales.</p>}
            </div>
            <div onClick={() => toggle(4)} className="faq-item">
              <h3>¿Cómo ser colaborador?</h3>
              {open === 4 && <p>Para colaborar puedes ponerte en contacto con nosotros a través de nuestro mail o redes sociales.</p>}
            </div>
          </div>
        </div>
        <div className="imagen">
          <img src="https://i.imgur.com/1o6HrcP.jpeg" alt="Accesibilidad" />
        </div>
      </section>

      <footer className="footer">
        <div className="footer-text">Contacto: 091 222 333 — savi@gmail.com.uy</div>
        <div className="footer-socials">
          <span><FaInstagram /></span>
          <span><FaLinkedin /></span>
          <span><FaWhatsapp /></span>
          <span><MdMailOutline /></span>
        </div>
      </footer>
      <ModalLogin isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
};

export default Inicio;
