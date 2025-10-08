import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { API_CONFIG, buildApiUrl } from "./config/api";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import "./EditarPerfil.css";

export default function EditarPerfil() {
  const { user } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [accessibility, setAccessibility] = useState({
    a: { pasillos: false, ramp: false, elevator: false },
    b: { pasillos: false, ramp: false, elevator: false },
    c: { pasillos: false, ramp: false, elevator: false },
    d: { pasillos: false, ramp: false, elevator: false }
  });

  // Cargar datos de la empresa al montar el componente
  useEffect(() => {
    if (user && user.id && user.tipo === 'empresa') {
      cargarDatosEmpresa();
    }
  }, [user]);

  const cargarDatosEmpresa = async () => {
    try {
      const response = await fetch(buildApiUrl(`empresa/${user.id}`));
      const data = await response.json();
      
      if (data.success) {
        setNombre(data.empresa.nombre || "");
        setEmail(data.empresa.email || "");
        if (data.empresa.accesibilidad) {
          setAccessibility(data.empresa.accesibilidad);
        }
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const toggleAcc = (key, field) => {
    setAccessibility(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: !prev[key][field] }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    if (!user || !user.id) {
      setError("No hay usuario autenticado");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(buildApiUrl(`empresa/${user.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          email: email,
          descripcion: description,
          direccion: address,
          contacto: contact,
          accesibilidad: accessibility
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          window.history.back();
        }, 1500);
      } else {
        setError(data.error || "Error al guardar cambios");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editar-modal-backdrop" onClick={() => window.history.back()}>
      <div className="editar-modal-card" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
        <button className="close-x" aria-label="Cerrar" onClick={() => window.history.back()}>×</button>
        <h1 className="editar-title">Edita tu perfil <span className="lapiz" aria-hidden="true"><FaRegEdit /></span></h1>
        <div className="editar-subtitle">Elige la información sobre tu local</div>

        {error && (
          <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center', padding: '10px', backgroundColor: '#ffebee', borderRadius: '5px' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ color: 'green', marginBottom: '15px', textAlign: 'center', padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '5px' }}>
            Cambios guardados con éxito
          </div>
        )}

        <form onSubmit={handleSubmit} className="editar-form">
            <label className="sr-only" htmlFor="nombre">Nombre de la empresa</label>
            <input
              id="nombre"
              className="input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre de la empresa"
              required
            />

            <label className="sr-only" htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />

            <label className="sr-only" htmlFor="descripcion">Descripción</label>
            <input
              id="descripcion"
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción"
            />

            <label className="sr-only" htmlFor="direccion">Dirección</label>
            <input
              id="direccion"
              className="input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Dirección"
            />

            <label className="sr-only" htmlFor="contacto">Contacto</label>
            <input
              id="contacto"
              className="input"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Contacto"
            />

            <div className="accesibilidad">
              <div className="acc-title">Accesibilidad:</div>

              {Object.keys(accessibility).map((rowKey, index) => (
                <div className="acc-box" key={rowKey}>
                  <label className={`acc-box ${accessibility[rowKey].pasillos ? "checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={accessibility[rowKey].pasillos}
                      onChange={() => toggleAcc(rowKey, "pasillos")}
                    />
                    <span>Pasillos min 90cm</span>
                  </label>
                  <label className={`acc-box ${accessibility[rowKey].ramp ? "checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={accessibility[rowKey].ramp}
                      onChange={() => toggleAcc(rowKey, "ramp")}
                    />
                    <span>Rampa</span>
                  </label>
                  <label className={`acc-box ${accessibility[rowKey].elevator ? "checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={accessibility[rowKey].elevator}
                      onChange={() => toggleAcc(rowKey, "elevator")}
                    />
                    <span>Ascensor</span>
                  </label>
                </div>
              ))}
            </div>

            <div className="acciones">
              <button 
                type="submit" 
                className="guardar"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}


