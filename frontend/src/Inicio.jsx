import React, { useState } from "react";
import "./Inicio.css";

const Inicio = () => {
  const [open, setOpen] = useState(null);

  const toggle = (i) => {
    setOpen(open === i ? null : i);
  };

  return (
    <div className="inicio">
      <header className="navbar">
        <div className="logo">SAVI</div>
        <nav className="nav-links">
          <button>Iniciar sesión</button>
          <button>Ir a la web</button>
          <button>Registrarse</button>
        </nav>
      </header>

      <section className="hero">
        <h1>SAVI</h1>
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
            <img src="https://via.placeholder.com/250" alt="Opción 1" />
            <p>Domino´s pizza</p>
            <p>Poctitos</p>
            <p>Rampa</p>
          </div>
          <div className="card">
            <img src="https://via.placeholder.com/250" alt="Opción 2" />
            <p>Domino´s pizza</p>
            <p>Poctitos</p>
            <p>Rampa</p>
          </div>
          <div className="card">
            <img src="https://via.placeholder.com/250" alt="Opción 3" />
            <p>Domino´s pizza</p>
            <p>Poctitos</p>
            <p>Rampa</p>
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
              {open === 1 && <p>Somos un equipo que busca ...</p>}
            </div>
            <div onClick={() => toggle(2)} className="faq-item">
              <h3>¿Qué hacemos?</h3>
              {open === 2 && <p>Nos enfocamos en ...</p>}
            </div>
            <div onClick={() => toggle(3)} className="faq-item">
              <h3>¿Cómo contactarnos?</h3>
              {open === 3 && <p>Puedes escribirnos a ...</p>}
            </div>
            <div onClick={() => toggle(4)} className="faq-item">
              <h3>¿Cómo ser colaborador?</h3>
              {open === 4 && <p>Para colaborar puedes ...</p>}
            </div>
          </div>
        </div>
        <div className="imagen">
          <img src="https://i.imgur.com/1o6HrcP.jpeg" alt="Accesibilidad" />
        </div>
      </section>

      <footer className="footer">
        <p>Contacto: 091 222 333 — savi@gmail.com.uy</p>
        <div className="socials">
          <span>📷</span>
          <span>📘</span>
          <span>🐦</span>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
