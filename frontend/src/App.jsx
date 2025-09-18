import React, { useState } from 'react'
import Inicio from './Inicio.jsx'
import Registro from './Registro.jsx'
import './App.css'

export default function App() {
  const [view, setView] = useState('inicio')

  return (
    <>
      {view === 'inicio' && (
        <Inicio onGoRegistro={() => setView('registro')} />
      )}
      {view === 'registro' && (
        <Registro onBack={() => setView('inicio')} />
      )}
    </>
  )
}
