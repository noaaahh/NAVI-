import React, { useState, useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import Inicio from './Inicio.jsx'
import Registro from './Registro.jsx'
import RegistroPersonal from './RegistroPersonal.jsx'
import InicioUsuario from './InicioUsuario.jsx'
import Perfil from './Perfil.jsx'
import EditarPerfil from './EditarPerfil.jsx'
import Membresias from './Membresias.jsx'
import FormaPago from './FormaPago.jsx'
import RegistroEmpresa from './RegistroEmpresa.jsx'
import './App.css'

export default function App() {
  const [hash, setHash] = useState(window.location.hash || '#inicio');
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#inicio');
    window.addEventListener('hashchange', onHash);
    if (!window.location.hash) window.location.hash = '#inicio';
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Hash-based routing for all components
  if (hash === '#inicio') return <Inicio onGoRegistro={() => (window.location.hash = '#registro')} onGoInicioUsuario={() => (window.location.hash = '#inicio-usuario')} />;
  if (hash === '#registro') return <Registro onBack={() => (window.location.hash = '#inicio')} onGoRegistroPersonal={() => (window.location.hash = '#registro-personal')} onGoRegistroEmpresa={() => (window.location.hash = '#registroempresa')} />;
  if (hash === '#registro-personal') return <RegistroPersonal onBack={() => (window.location.hash = '#registro')} onGoInicio={() => (window.location.hash = '#inicio')} onGoInicioUsuario={() => (window.location.hash = '#inicio-usuario')} />;
  if (hash === '#inicio-usuario') return <InicioUsuario onBack={() => (window.location.hash = '#registro-personal')} onGoInicio={() => (window.location.hash = '#inicio')} />;
  if (hash === '#perfil') return <Perfil onEditPerfil={() => (window.location.hash = '#editar')} />;
  if (hash === '#editar') return <EditarPerfil />;
  if (hash === '#membresias') return <Membresias />;
  if (hash === '#formapago') return <FormaPago />;
  if (hash === '#registroempresa') return <RegistroEmpresa />;
  
  // Default fallback
  return <Inicio onGoRegistro={() => (window.location.hash = '#registro')} onGoInicioUsuario={() => (window.location.hash = '#inicio-usuario')} />;
}
