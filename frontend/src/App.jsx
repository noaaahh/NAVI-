import React, { useState } from 'react'
import Inicio from './Inicio.jsx'
import Registro from './Registro.jsx'
import RegistroPersonal from './RegistroPersonal.jsx'
import InicioUsuario from './InicioUsuario.jsx'
import './App.css'

export default function App() {
  const [view, setView] = useState('inicio')

  return (
    <>
      {view === 'inicio' && (
        <Inicio onGoRegistro={() => setView('registro')} />
      )}
      {view === 'registro' && (
        <Registro onBack={() => setView('inicio')} onGoRegistroPersonal={() => setView('registro-personal')} />
      )}
      {view === 'registro-personal' && (
        <RegistroPersonal onBack={() => setView('registro')} onGoInicio={() => setView('inicio')} onGoInicioUsuario={() => setView('inicio-usuario')} />
      )}
      {view === 'inicio-usuario' && (
        <InicioUsuario onBack={() => setView('registro-personal')} onGoInicio={() => setView('inicio')} />
      )}
    </>
  )
}
