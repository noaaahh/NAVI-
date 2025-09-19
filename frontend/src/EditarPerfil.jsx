import React, { useState } from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import "./EditarPerfil.css";

export default function EditarPerfil() {
  const [description, setDescription] = useState("Somos un restaurante de pizzas");
  const [address, setAddress] = useState("Pocitos y...");
  const [contact, setContact] = useState("123456789");

  const [accessibility, setAccessibility] = useState({
    pasillos90_1: { pasillos: false, ramp: false, elevator: true },
    pasillos90_2: { pasillos: false, ramp: false, elevator: false },
    pasillos90_3: { pasillos: false, ramp: false, elevator: false },
    pasillos90_4: { pasillos: false, ramp: false, elevator: false }
  });

  const toggleAcc = (key, field) => {
    setAccessibility(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: !prev[key][field] }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cambios guardados (demo)");
  };

  return (
    <div className="editar-modal-backdrop" onClick={() => window.history.back()}>
      <div className="editar-modal-card" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
        <button className="close-x" aria-label="Cerrar" onClick={() => window.history.back()}>×</button>
        <h1 className="editar-title">Edita tu perfil <span className="lapiz" aria-hidden><FaRegEdit />
        </span></h1>
        <div className="editar-subtitle">Elige la información sobre tu local</div>

        <form onSubmit={handleSubmit} className="editar-form">
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
              <button type="submit" className="guardar">Guardar cambios</button>
            </div>
        </form>
      </div>
    </div>
  );
}


