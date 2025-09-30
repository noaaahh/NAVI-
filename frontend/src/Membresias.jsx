import React from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import "./Membresias.css";

export default function Membresias() {
  const seleccionar = (plan) => {
    try { 
      localStorage.setItem("planSeleccionado", plan); 
    } catch {}
    window.location.hash = '#formapago';
  };

  return (
    <div className="membresias-page">
      <section className="membresias-hero">
        <div className="nav-links">
          <button onClick={() => (window.location.hash = '#inicio')}>Ayuda</button>
          <button className="btn-secondary" onClick={() => (window.location.hash = '#registroempresa')}>Volver atrás</button>
        </div>
        <h1 className="membresias-title">Opciones de membresía:</h1>
      </section>

      <main className="membresias-main">
        <div className="cards-grid">
          {/* Plan Básico */}
          <div className="plan-card basico">
            <div className="plan-icon">
              <div className="icon-circle">
                <span className="icon-minus">−</span>
              </div>
            </div>
            <h3 className="plan-title">Plan básico</h3>
            <p className="plan-subtitle">Empresa inclusiva</p>
            <div className="plan-price">
              <span className="price-main">35 USD</span>
              <span className="price-period">/mensual</span>
            </div>
            <p className="plan-description">
              Incluye exposición en redes sociales oficiales de S.A.V.I y aparecer destacados en el buscador de la aplicación.
            </p>
            <div className="plan-price-annual">250 USD anual</div>
            <button className="plan-button basico-btn" onClick={() => seleccionar('basico')}>Seleccionar</button>
          </div>

          {/* Plan Premium - Más popular */}
          <div className="plan-card premium">
            <div className="popular-badge">Más popular</div>
            <div className="plan-icon">
              <div className="icon-star">★</div>
            </div>
            <h3 className="plan-title">Plan premium</h3>
            <p className="plan-subtitle">Visibilidad y Formación</p>
            <div className="plan-price">
              <span className="price-main">65 USD</span>
              <span className="price-period">/mensual</span>
            </div>
            <p className="plan-description">
              Incluye beneficios del plan básico, acceso a estadísticas e interacción de usuarios, talleres y capacitaciones internas para el personal en accesibilidad e inclusión y material de comunicación listo para usar.
            </p>
            <div className="plan-price-annual">780 USD anual</div>
            <button className="plan-button premium-btn" onClick={() => seleccionar('premium')}>Seleccionar</button>
          </div>

          {/* Plan Plus */}
          <div className="plan-card plus">
            <div className="plan-icon">
              <div className="icon-circle">
                <span className="icon-minus">−</span>
              </div>
            </div>
            <h3 className="plan-title">Plan plus</h3>
            <p className="plan-subtitle">Empresa líder en inclusión</p>
            <div className="plan-price">
              <span className="price-main">90 USD</span>
              <span className="price-period">/mensual</span>
            </div>
            <p className="plan-description">
              Incluye beneficios del plan premium, consultoría personalizada, participación en campañas y eventos anuales organizados por S.A.V.I y distinción especial dentro de la app.
            </p>
            <div className="plan-price-annual">1080 USD anual</div>
            <button className="plan-button plus-btn" onClick={() => seleccionar('plus')}>Seleccionar</button>
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


