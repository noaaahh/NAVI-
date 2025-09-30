import React, { useState } from "react";
import "./LocalAmpliado.css";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaCheck,
  FaStar
} from "react-icons/fa";


const LocalAmpliado = ({ local, onGoBack }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);


  const localData = local || {
    nombre: "Estrella Fresca",
    descripcion: "Supermercado uruguayo con más de 20 años en el rubro y 60 locales en todo el país. Se enfoca en la inclusión y la proximidad con el cliente, ofreciendo productos de calidad y locales accesibles para todos.",
    direccion: "Carlos Quijano 1067, apto 9",
    telefono: "099 999 999",
    email: "contacto@estrellafresca.com.uy",
    calificacion: 4.5,
    accesibilidades: [
      "Rampa",
      "Atención prioritaria",
      "Baño adaptado",
      "Caja accesible",
      "Ascensor"
    ],
    imagenes: [
      "https://i.imgur.com/BBojpYB.png",
      "https://i.imgur.com/6LvOxdx.png",
      "https://i.imgur.com/jo6rH6V.png"
    ]
  };


  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;


    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }


    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star half" />);
    }


    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star empty" />);
    }


    return stars;
  };


  return (
    <div className="local-ampliado">
      <header className="local-header">
        <div className="header-buttons">
          <button className="btn-ayuda">Ayuda</button>
          <button className="btn-volver" onClick={onGoBack}>Volver atrás</button>
        </div>
        <div className="header-content">
          <h1 className="local-nombre">{localData.nombre}</h1>
          <p className="local-descripcion">{localData.descripcion}</p>
        </div>
      </header>


      <main className="local-main">
        <div className="main-card">
          <section className="contacto-section">
            <h2>Contacto</h2>
            <div className="contacto-info">
              <div className="contacto-item">
                <FaMapMarkerAlt className="contacto-icon" />
                <span className="contacto-label">Dirección:</span>
                <span className="contacto-value">{localData.direccion}</span>
              </div>
              <div className="contacto-item">
                <FaPhone className="contacto-icon" />
                <span className="contacto-label">Teléfono:</span>
                <span className="contacto-value">{localData.telefono}</span>
              </div>
            </div>
            <button
              className="btn-email"
              onClick={() => setShowEmailForm(!showEmailForm)}
            >
              Enviar email
            </button>
          </section>


          <section className="accesibilidades-section">
            <h2>Accesibilidades</h2>
            <div className="accesibilidades-list">
              {localData.accesibilidades.map((item, index) => (
                <div key={index} className="accesibilidad-item">
                  <FaCheck className="check-icon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>


          <section className="calificacion-section">
            <div className="calificacion-box">
              <div className="stars-container">
                {renderStars(localData.calificacion)}
              </div>
              <div className="calificacion-numero">{localData.calificacion}</div>
              <div className="calificacion-texto">Calificación de los clientes</div>
            </div>
          </section>
        </div>


        <section className="galeria-section">
          {localData.imagenes.map((imagen, index) => (
            <div key={index} className="galeria-item">
              <img src={imagen} alt={`${localData.nombre} - Imagen ${index + 1}`} />
            </div>
          ))}
        </section>
      </main>


      <footer className="local-footer">
        <div className="footer-socials">
          <FaInstagram className="social-icon" />
          <FaLinkedin className="social-icon" />
          <FaWhatsapp className="social-icon" />
          <FaEnvelope className="social-icon" />
        </div>
        <div className="footer-contact">
          <span>Contacto: 091 222 333</span>
          <span>savi@gmail.com.uy</span>
        </div>
      </footer>


      {showEmailForm && (
        <div className="email-modal-overlay">
          <div className="email-modal">
            <div className="modal-header">
              <h3>Contactar a {localData.nombre}</h3>
              <button className="close-modal" onClick={() => setShowEmailForm(false)}>×</button>
            </div>
            <form className="email-form">
              <div className="form-group">
                <label htmlFor="email-subject">Asunto:</label>
                <input 
                  id="email-subject"
                  type="text" 
                  placeholder="Consulta sobre accesibilidad..."
                  className="email-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email-message">Mensaje:</label>
                <textarea
                  id="email-message"
                  placeholder="Hola! Me gustaría saber más sobre las opciones de accesibilidad disponibles en su local. ¿Podrían proporcionarme más información sobre..."
                  rows="5"
                  className="email-textarea"
                ></textarea>
              </div>
              <div className="modal-buttons">
                <button type="button" className="btn-cancel" onClick={() => setShowEmailForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-send">
                   Enviar mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default LocalAmpliado;
