import React, { useState } from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import "./FormaPago.css";

export default function FormaPago() {
  const [plan, setPlan] = useState("mensual");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  const submit = (e) => {
    e.preventDefault();
    alert(`Pago enviado (demo) - Plan: ${plan}`);
    window.location.hash = '#perfil';
  };

  return (
    <div className="membresia-page">
      <section className="membresia-hero">
        <div className="nav-links">
          <button onClick={() => (window.location.hash = '#inicio')}>Inicio</button>
          <button className="btn-secondary" onClick={() => (window.location.hash = '#membresias')}>Volver atrás</button>
        </div>
        <h1 className="membresia-title">Opciones de membresía:</h1>
      </section>

      <main className="membresia-main">
        <form className="membresia-card" onSubmit={submit}>
          <div className="plan-row">
            <label className={`plan ${plan==='mensual' ? 'checked' : ''}`}>
              <input type="radio" name="plan" checked={plan==='mensual'} onChange={() => setPlan('mensual')} />
              <span>Plan básico mensual</span>
            </label>
            <label className={`plan ${plan==='anual' ? 'checked' : ''}`}>
              <input type="radio" name="plan" checked={plan==='anual'} onChange={() => setPlan('anual')} />
              <span>Plan básico anual</span>
            </label>
          </div>

          <label className="input-label" htmlFor="num">Nro de tarjeta:</label>
          <input id="num" className="input" placeholder="•••• •••• •••• ••••" value={cardNumber} onChange={e=>setCardNumber(e.target.value)} />

          <label className="input-label" htmlFor="cvv">Nro de seguridad:</label>
          <input id="cvv" className="input" placeholder="CVV" value={cvv} onChange={e=>setCvv(e.target.value)} />

          <label className="input-label" htmlFor="exp">Fecha de vencimiento:</label>
          <input id="exp" className="input" placeholder="MM/AA" value={expiry} onChange={e=>setExpiry(e.target.value)} />

          <button type="submit" className="pagar-btn" >Enviar pago</button>
        </form>
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


