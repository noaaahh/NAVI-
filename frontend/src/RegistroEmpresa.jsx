import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import "./RegistroEmpresa.css";

export default function RegistroEmpresa({ onBack, onGoInicio }) {
  const [form, setForm] = useState({ nombre: "", email: "", password: "", password2: "" });
  const [acc, setAcc] = useState({
    a: { pasillos: false, ramp: false, elevator: true },
    b: { pasillos: false, ramp: false, elevator: false },
    c: { pasillos: false, ramp: false, elevator: false },
    d: { pasillos: false, ramp: false, elevator: false }
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggle = (k, f) => setAcc(p => ({ ...p, [k]: { ...p[k], [f]: !p[k][f] } }));

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
      const empresaData = {
        tipo: "empresa",
        nombre: form.nombre,
        email: form.email,
        password: form.password,
        accesibilidad: acc  // Enviar los datos de accesibilidad
      };

      const result = await register(empresaData);
      
      if (result.success) {
        // Redirigir a membresías después del registro exitoso
        window.location.hash = '#membresias';
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
    <div className="perfil-emp-page">
      <header className="pe-hero">
        <div className="nav-links">
          <button onClick={onGoInicio || (() => window.location.hash = '#inicio')}>Inicio</button>
          <button className="btn-secondary" onClick={onBack || (() => window.location.hash = '#registro')}>Volver atrás</button>
        </div>
        <img
          className="pe-hero-img"
          src="https://i.imgur.com/9bmoDHn.png"
          alt="Bienvenida"
        />
        <h1 className="pe-title">Registra tu empresa en SAVI</h1>
      </header>

      <div className="pe-subtitle">Te pedimos que completes los siguientes campos para poder iniciarte en SAVI</div>

      <main className="pe-main">
        <form className="pe-card form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message" style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <label>Nombre de la empresa</label>
          <input 
            className="pe-input" 
            name="nombre"
            placeholder="" 
            value={form.nombre} 
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input 
            className="pe-input" 
            name="email"
            type="email"
            placeholder="ejemplo@gmail.com" 
            value={form.email} 
            onChange={handleChange}
            required
          />

          <label>Contraseña</label>
          <input 
            className="pe-input" 
            name="password"
            type="password" 
            value={form.password} 
            onChange={handleChange}
            minLength="6"
            required
          />

          <label>Confirmar contraseña</label>
          <input 
            className="pe-input" 
            name="password2"
            type="password" 
            value={form.password2} 
            onChange={handleChange}
            required
          />

          <button 
            className="pe-submit" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Ingresar"}
          </button>
        </form>

        <section className="pe-card acc">
          <h2>¿Qué servicios de accesibilidad ofrecen?</h2>
          {Object.keys(acc).map((k) => (
            <div className="acc-row" key={k}>
              <label className={`acc-box ${acc[k].pasillos ? 'checked' : ''}`}>
                <input type="checkbox" checked={acc[k].pasillos} onChange={() => toggle(k,'pasillos')} />
                <span>Pasillos min 90cm</span>
               </label>
              <label className={`acc-box ${acc[k].ramp ? 'checked' : ''}`}>
                <input type="checkbox" checked={acc[k].ramp} onChange={() => toggle(k,'ramp')} />
                <span>Rampa</span>
              </label>
              <label className={`acc-box ${acc[k].elevator ? 'checked' : ''}`}>
                <input type="checkbox" checked={acc[k].elevator} onChange={() => toggle(k,'elevator')} />
                <span>Ascensor</span>
              </label>
            </div>
          ))}
        </section>
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


