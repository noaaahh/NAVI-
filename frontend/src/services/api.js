import { API_CONFIG, buildApiUrl } from '../config/api.js';

// Función helper para hacer requests
const apiRequest = async (endpoint, options = {}) => {
  const url = buildApiUrl(endpoint);
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error en la petición');
    }

    return data;
  } catch (error) {
    console.error('Error en API request:', error);
    throw error;
  }
};

// Servicios de autenticación
export const authService = {
  // Registro de usuario o empresa
  register: async (userData) => {
    return apiRequest(API_CONFIG.ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Inicio de sesión
  login: async (credentials) => {
    return apiRequest(API_CONFIG.ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Cerrar sesión (limpiar localStorage)
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  // Obtener usuario actual del localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Guardar usuario en localStorage
  setCurrentUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('user');
  }
};

// Servicios de datos (puedes expandir esto según necesites)
export const dataService = {
  // Aquí puedes agregar más servicios como:
  // getEmpresas: () => apiRequest('empresas.php'),
  // updatePerfil: (data) => apiRequest('perfil.php', { method: 'PUT', body: JSON.stringify(data) }),
  // etc.
};

export default { authService, dataService };
