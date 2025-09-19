import React from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import "./Membresias.css";

export default function Membresias() {
  const seleccionar = (plan) => {
    // Guarda el plan elegido (opcional) y navega al pago
    try { localStorage.setItem("planSeleccionado", plan); } catch {}
    window.location.hash = '#formapago';
  };

  return (
    <div className="membresias-page">
      <section className="membresias-hero">
        <div className="nav-links">
          <button onClick={() => (window.location.hash = '#inicio')}>Inicio</button>
          <button className="btn-secondary" onClick={() => (window.location.hash = '#registroempresa')}>Volver atrás</button>
        </div>
        <h1 className="membresias-title">Opciones de membresía:</h1>
      </section>

      <main className="membresias-main">
        <div className="cards-grid">
          <div className="card">
            <div className="precio">35 USD mensual / 250 USD anual.</div>
            <h3>Plan básico</h3>
            <p className="resumen">Empresa Inclusiva Inicial:</p>
            <p className="detalle">Incluye exposición en redes sociales oficiales de S.A.V.I y aparecer destacados en el buscador de la aplicación.</p>
            <button className="seleccionar" onClick={() => seleccionar('basico')}>Seleccionar</button>
          </div>

          <div className="card central">
            <div className="precio">65 USD mensual / 780 USD anual.</div>
            <h3>Plan premium</h3>
            <p className="resumen">Visibilidad y Formación:</p>
            <p className="detalle">Incluye plan básico + estadísticas, interacción, talleres internos de accesibilidad y material listo para usar.</p>
            <button className="seleccionar" onClick={() => seleccionar('premium')}>Seleccionar</button>
          </div>

          <div className="card">
            <div className="precio">90 USD mensual / 1.080 USD anual.</div>
            <h3>Plan plus</h3>
            <p className="resumen">Empresa Líder en Inclusión:</p>
            <p className="detalle">Incluye plan premium + consultoría, campañas, eventos S.A.V.I y distinción en la app.</p>
            <button className="seleccionar" onClick={() => seleccionar('plus')}>Seleccionar</button>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-socials">
          <span><FaInstagram /></span>
          <span><FaLinkedin /></span>
          <span><FaWhatsapp /></span>
          <span><MdMailOutline /></span>
        </div>
        <div className="footer-text">Contacto: 091 222 333 — savi@gmail.com.uy</div>
      </footer>
    </div>
  );
}


