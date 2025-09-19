import React from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaRegEdit } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import "./Perfil.css";

export default function Perfil({ onEditPerfil }) {
  return (
    <div className="perfil-page">
      <section className="perfil-hero">
        <div className="nav-links">
          <button onClick={() => (window.location.hash = '#inicio')}>Inicio</button>
          <button className="btn-secondary" onClick={() => (window.location.hash = '#registro')}>Volver atrás</button>
        </div>
        <h1 className="perfil-title">Ahora edita tu perfil <span className="lapiz" aria-hidden="true"><FaRegEdit /></span></h1>
      </section>

      <main className="perfil-content">
        <div className="perfil-bloque">
          <button className="perfil-edit-link" onClick={onEditPerfil}>Editar perfil</button>
          <button className="perfil-edit-link" style={{right: 120}} onClick={() => (window.location.hash = '#membresias')}>Membresía</button>
        </div>

        <div className="perfil-galeria">
          {["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1970&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1974&auto=format&fit=crop"].map((src, i) => (
            <div key={i} className="perfil-card">
              <img src={src} alt={`imagen ${i+1}`} />
              <button className="card-edit" aria-label="Editar"><FaRegEdit /></button>
            </div>
          ))}
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


