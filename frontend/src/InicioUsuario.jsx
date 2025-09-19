import React, { useState } from "react";
import "./InicioUsuario.css";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaSearch } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { BsFilterLeft } from "react-icons/bs";

const InicioUsuario = ({ onBack, onGoInicio }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ rampa: false, bano: false, braille: false, interprete: false });
  const [query, setQuery] = useState("");

  const toggleFilter = () => setIsFilterOpen((v) => !v);
  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };


  const cards = new Array(6).fill(0).map((_, i) => ({
    id: i + 1,
    title: "EstrellaFresca",
    subtitle: ["Rampa", "Carteleras Braille", "Baño adaptado", "Rampas", "Accesibilidad", "Adaptado"][i % 6],
    image: [
      "https://i.imgur.com/iJ3oRBJ.png",
      "https://i.imgur.com/zGkH5ct.png",
      "https://i.imgur.com/bwoRoNn.png",
      "https://i.imgur.com/npXxBer.png",
      "https://i.imgur.com/7gILHEu.png",
      "https://i.imgur.com/xrv7qTZ.png",
    ][i],
  }));

  return (
    <div className="inicioUsuario">
      <section className="inicioUsuario__hero">
        <nav className="inicioUsuario__nav">
          <button className="inicioUsuario__btn inicioUsuario__btn--primary" onClick={onGoInicio}>Inicio</button>
          <button className="inicioUsuario__btn" onClick={onBack}>Volver atrás</button>
        </nav>
        <img
          className="inicioUsuario__hero-img"
          src="https://i.imgur.com/9bmoDHn.png"
          alt="Bienvenida"
        />
        <h1 className="inicioUsuario__title">¡Te damos la bienvenida!</h1>
      </section>

      <section className="inicioUsuario__toolbar">
        <div className="inicioUsuario__filter">
          <button className="inicioUsuario__filter-toggle" onClick={toggleFilter}>
            <BsFilterLeft />
            Filtro
          </button>
          {isFilterOpen && (
            <div className="inicioUsuario__filter-panel">
              <label><input type="checkbox" name="rampa" checked={filters.rampa} onChange={handleFilterChange} /> Rampa</label>
              <label><input type="checkbox" name="bano" checked={filters.bano} onChange={handleFilterChange} /> Baño adaptado</label>
              <label><input type="checkbox" name="braille" checked={filters.braille} onChange={handleFilterChange} /> Braille</label>
              <label><input type="checkbox" name="interprete" checked={filters.interprete} onChange={handleFilterChange} /> Intérprete</label>
            </div>
          )}
        </div>
        <input
          className="inicioUsuario__search"
          type="text"
          placeholder="Buscar aquí"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="inicioUsuario__search-icon">
          <FaSearch />
        </div>
      </section>

      <section className="inicioUsuario__grid">
        {cards.map((c) => (
          <div key={c.id} className="inicioUsuario__card" style={{ backgroundImage: `url(${c.image})` }}>
            <div className="inicioUsuario__card-overlay">
              <div className="inicioUsuario__card-title">{c.title} - {c.subtitle}</div>
            </div>
          </div>
        ))}
      </section>

      <footer className="inicioUsuario__footer">
        <div className="inicioUsuario__footer-left">
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
          <a href="#" aria-label="Email"><MdMailOutline /></a>
        </div>
        <div className="inicioUsuario__footer-right">Contacto: 091 222 333 — savi@gmail.com.uy</div>
      </footer>
    </div>
  );
};

export default InicioUsuario;


