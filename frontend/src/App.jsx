import React, { useState, useEffect } from 'react'
import Inicio from './Inicio.jsx'
import Perfil from './Perfil.jsx'
import EditarPerfil from './EditarPerfil.jsx'
import Membresias from './Membresias.jsx'
import FormaPago from './FormaPago.jsx'
import RegistroEmpresa from './RegistroEmpresa.jsx'
import './App.css'

export default function App() {
  const [hash, setHash] = useState(window.location.hash || '#perfil');

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#perfil');
    window.addEventListener('hashchange', onHash);
    if (!window.location.hash) window.location.hash = '#perfil';
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (hash === '#inicio') return <Inicio />;
  if (hash === '#editar') return <EditarPerfil />;
  if (hash === '#membresias') return <Membresias />;
  if (hash === '#formapago') return <FormaPago />;
  if (hash === '#registroempresa') return <RegistroEmpresa />;
  return <Perfil onEditPerfil={() => (window.location.hash = '#editar')} />
}
