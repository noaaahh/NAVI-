import React, { useState } from "react";
import "./InicioUsuario.css";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaSearch } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { BsFilterLeft } from "react-icons/bs";
import LocalAmpliado from "./LocalAmpliado";


const InicioUsuario = ({ onBack, onGoInicio }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ rampa: false, bano: false, braille: false, interprete: false });
  const [query, setQuery] = useState("");
  const [selectedLocal, setSelectedLocal] = useState(null);


  const toggleFilter = () => setIsFilterOpen((v) => !v);
  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };


  const handleCardClick = (local) => {
    setSelectedLocal(local);
  };


  const handleGoBack = () => {
    setSelectedLocal(null);
  };




  const localesData = [
    {
      id: 1,
      nombre: "Estrella Fresca",
      descripcion: "Supermercado uruguayo con más de 20 años en el rubro y 60 locales en todo el país. Se enfoca en la inclusión y la proximidad con el cliente, ofreciendo productos de calidad y locales accesibles para todos.",
      direccion: "Carlos Quijano 1067, apto 9",
      telefono: "099 999 999",
      email: "contacto@estrellafresca.com.uy",
      calificacion: 4.5,
      accesibilidades: ["Rampa", "Atención prioritaria", "Baño adaptado", "Caja accesible", "Ascensor"],
      imagenes: [
        "https://i.imgur.com/BBojpYB.png",
        "https://i.imgur.com/6LvOxdx.png",
        "https://i.imgur.com/jo6rH6V.png"
      ],
      image: "https://i.imgur.com/iJ3oRBJ.png",
      subtitle: "Rampa"
    },
    {
      id: 2,
      nombre: "Domino's Pizza",
      descripcion: "Cadena internacional de pizzerías con más de 15 años en Uruguay. Ofrece delivery y take away con opciones accesibles para todos los clientes.",
      direccion: "Av. 18 de Julio 1234",
      telefono: "099 888 777",
      email: "contacto@dominos.com.uy",
      calificacion: 4.2,
      accesibilidades: ["Carteleras Braille", "Atención prioritaria", "Baño adaptado"],
      imagenes: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop"
      ],
      image: "https://i.imgur.com/zGkH5ct.png",
      subtitle: "Carteleras Braille"
    },
    {
      id: 3,
      nombre: "McDonald's",
      descripcion: "Restaurante de comida rápida con múltiples ubicaciones en Montevideo. Comprometido con la accesibilidad y la inclusión de todos los clientes.",
      direccion: "Av. Italia 3456",
      telefono: "099 777 666",
      email: "contacto@mcdonalds.com.uy",
      calificacion: 4.0,
      accesibilidades: ["Baño adaptado", "Rampa", "Atención prioritaria", "Caja accesible"],
      imagenes: [
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop"
      ],
      image: "https://i.imgur.com/bwoRoNn.png",
      subtitle: "Baño adaptado"
    },
    {
      id: 4,
      nombre: "Starbucks",
      descripcion: "Cafetería internacional con ambiente acogedor y opciones accesibles. Perfecto para trabajar, estudiar o disfrutar de un buen café.",
      direccion: "Pocitos 789",
      telefono: "099 666 555",
      email: "contacto@starbucks.com.uy",
      calificacion: 4.3,
      accesibilidades: ["Rampas", "Baño adaptado", "Atención prioritaria"],
      imagenes: [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop"
      ],
      image: "https://i.imgur.com/npXxBer.png",
      subtitle: "Rampas"
    },
    {
      id: 5,
      nombre: "Burger King",
      descripcion: "Restaurante de hamburguesas con amplio menú y opciones accesibles. Ubicado en zona céntrica con fácil acceso.",
      direccion: "Centro 1011",
      telefono: "099 555 444",
      email: "contacto@burgerking.com.uy",
      calificacion: 3.8,
      accesibilidades: ["Accesibilidad", "Baño adaptado", "Rampa"],
      imagenes: [
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop"
      ],
      image: "https://i.imgur.com/7gILHEu.png",
      subtitle: "Accesibilidad"
    },
    {
      id: 6,
      nombre: "Subway",
      descripcion: "Restaurante de sándwiches frescos con opciones saludables y accesibles. Perfecto para una comida rápida y nutritiva.",
      direccion: "Cordón 1213",
      telefono: "099 444 333",
      email: "contacto@subway.com.uy",
      calificacion: 4.1,
      accesibilidades: ["Adaptado", "Baño adaptado", "Atención prioritaria"],
      imagenes: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop"
      ],
      image: "https://i.imgur.com/xrv7qTZ.png",
      subtitle: "Adaptado"
    }
  ];


  const cards = localesData;


  if (selectedLocal) {
    return (
      <LocalAmpliado
        local={selectedLocal}
        onGoBack={handleGoBack}
      />
    );
  }


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
        <div className="inicioUsuario__search-container">
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
        </div>
      </section>


      <section className="inicioUsuario__grid">
        {cards.map((c) => (
          <div
            key={c.id}
            className="inicioUsuario__card"
            style={{ backgroundImage: `url(${c.image})` }}
          >
            <div className="inicioUsuario__card-overlay">
              <div className="inicioUsuario__card-content">
                <div className="inicioUsuario__card-title">{c.nombre} - {c.subtitle}</div>
                <button 
                  className="inicioUsuario__card-button"
                  onClick={() => handleCardClick(c)}
                >
                  Ver →
                </button>
              </div>
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
