import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { buildApiUrl } from "./config/api";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaRegEdit } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import "./Perfil.css";

export default function Perfil({ onEditPerfil }) {
  const { user } = useAuth();
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setEmpresa(data.empresa);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="perfil-page">
      <section className="perfil-hero">
        <div className="nav-links">
          <button onClick={() => (window.location.hash = '#inicio')}>Inicio</button>
          <button className="btn-secondary" onClick={() => (window.location.hash = '#registro')}>Volver atrás</button>
        </div>
        <h1 className="perfil-title">
          {empresa ? empresa.nombre : 'Mi Perfil'} <span className="lapiz" aria-hidden="true"><FaRegEdit /></span>
        </h1>
      </section>

      <main className="perfil-content">
        <div className="perfil-bloque">
          <button className="perfil-edit-link" onClick={onEditPerfil}>Editar perfil</button>
          <button className="perfil-edit-link" style={{right: 120}} onClick={() => (window.location.hash = '#membresias')}>Membresía</button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>
            Cargando datos...
          </div>
        ) : empresa ? (
          <div className="perfil-info" style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '10px', 
            marginBottom: '30px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Información de la Empresa</h2>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              <div>
                <strong style={{ color: '#666' }}>Nombre:</strong>
                <p style={{ margin: '5px 0', fontSize: '16px' }}>{empresa.nombre || 'No especificado'}</p>
              </div>

              <div>
                <strong style={{ color: '#666' }}>Email:</strong>
                <p style={{ margin: '5px 0', fontSize: '16px' }}>{empresa.email || 'No especificado'}</p>
              </div>

              {empresa.accesibilidad && (
                <div>
                  <strong style={{ color: '#666' }}>Accesibilidad:</strong>
                  <div style={{ marginTop: '10px' }}>
                    {Object.entries(empresa.accesibilidad).map(([key, value], index) => (
                      <div key={key} style={{ 
                        marginBottom: '10px', 
                        padding: '10px', 
                        backgroundColor: '#f5f5f5', 
                        borderRadius: '5px' 
                      }}>
                        <strong>Local {index + 1}:</strong>
                        <div style={{ marginTop: '5px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                          {value.pasillos && <span>✓ Pasillos min 90cm</span>}
                          {value.ramp && <span>✓ Rampa</span>}
                          {value.elevator && <span>✓ Ascensor</span>}
                          {!value.pasillos && !value.ramp && !value.elevator && (
                            <span style={{ color: '#999' }}>Sin información de accesibilidad</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#999' }}>
            No se pudieron cargar los datos
          </div>
        )}

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


