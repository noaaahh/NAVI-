import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import "./RegistroPersonal.css";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

const RegistroPersonal = ({ onBack, onGoInicio, onGoInicioUsuario }) => {
  const [form, setForm] = useState({ nombre: "", email: "", password: "", password2: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validaciones
    if (form.password !== form.password2) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        tipo: "usuario",
        nombre: form.nombre,
        email: form.email,
        password: form.password
      };

      const result = await register(userData);
      
      if (result.success) {
        onGoInicioUsuario && onGoInicioUsuario(result.user);
      } else {
        setError(result.error || "Error al registrarse");
      }
    } catch (err) {
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registroPersonal">
      <section className="registroPersonal__hero">
        <nav className="registroPersonal__nav">
          <button className="registroPersonal__btn registroPersonal__btn--primary" onClick={onGoInicio}>Inicio</button>
          <button className="registroPersonal__btn" onClick={onBack}>Volver atrás</button>
        </nav>
        <img
          className="registroPersonal__hero-img"
          src="https://i.imgur.com/S23StlD.png"
          alt="Cocina registro SAVI"
        />
        <h1 className="registroPersonal__title">Registrate en SAVI</h1>
      </section>

      <div className="registroPersonal__intro">
        Te pedimos que completes los siguientes campos para poder disfrutar de SAVI
      </div>

      <section className="registroPersonal__form-wrapper">
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form className="registroPersonal__form" onSubmit={handleSubmit}>
          <label className="registroPersonal__label" htmlFor="rp-nombre">Nombre</label>
          <input 
            id="rp-nombre" 
            name="nombre" 
            value={form.nombre} 
            onChange={handleChange} 
            placeholder="Tu nombre completo"
            required
          />

          <label className="registroPersonal__label" htmlFor="rp-email">Email</label>
          <input 
            id="rp-email" 
            name="email" 
            type="email"
            value={form.email} 
            onChange={handleChange} 
            placeholder="ejemplo@gmail.com"
            required
          />

          <label className="registroPersonal__label" htmlFor="rp-password">Contraseña</label>
          <input 
            id="rp-password" 
            name="password" 
            type="password" 
            value={form.password} 
            onChange={handleChange}
            minLength="6"
            required
          />

          <label className="registroPersonal__label" htmlFor="rp-password2">Confirmar contraseña</label>
          <input 
            id="rp-password2" 
            name="password2" 
            type="password" 
            value={form.password2} 
            onChange={handleChange}
            required
          />

          <button 
            type="submit" 
            className="registroPersonal__submit"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </section>

      <footer className="registroPersonal__footer">
        <div className="registroPersonal__footer-left">
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
          <a href="#" aria-label="Email"><MdMailOutline /></a>
        </div>
        <div className="registroPersonal__footer-right">
          <span>Contacto: 091 222 333 — savi@gmail.com.uy</span>
        </div>
      </footer>
    </div>
  );
};

export default RegistroPersonal;


