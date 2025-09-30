import React from "react";
import LocalAmpliado from "./LocalAmpliado";


const EjemploLocalAmpliado = () => {
  const localEjemplo = {
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
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop"
    ]
  };


  const handleGoBack = () => {
    console.log("Volver atrás");
  };


  return (
    <div>
      <LocalAmpliado
        local={localEjemplo}
        onGoBack={handleGoBack}
      />
    </div>
  );
};


export default EjemploLocalAmpliado;
