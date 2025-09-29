import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import "./ModalLogin.css";

const ModalLogin = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        onLoginSuccess && onLoginSuccess(result.user);
        onClose();
        // Redirigir según el tipo de usuario
        if (result.user.tipo === 'usuario') {
          window.location.hash = '#inicio-usuario';
        } else if (result.user.tipo === 'empresa') {
          window.location.hash = '#perfil';
        }
      } else {
        setError(result.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-login-backdrop" onClick={onClose}>
      <div className="modal-login" onClick={e => e.stopPropagation()}>
        <button className="close-x" onClick={onClose} aria-label="Cerrar">×</button>
        <h2 className="modal-title">Iniciar Sesión</h2>
        <div className="modal-warning">Debes iniciar sesión para continuar</div>
        
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
            {error}
          </div>
        )}

        <form className="modal-login-form" onSubmit={handleSubmit}>
          <label className="modal-label" htmlFor="login-email">Email</label>
          <input 
            id="login-email" 
            className="email" 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="modal-label" htmlFor="login-password">Contraseña</label>
          <input 
            id="login-password" 
            className="password" 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            className="entrar-btn" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Iniciando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
