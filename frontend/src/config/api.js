// Configuración de la API - Ahora usando Node.js + Express + Prisma
export const API_CONFIG = {
  // URL base del backend Node.js
  BASE_URL: 'http://localhost:3001/api',
  
  // Endpoints
  ENDPOINTS: {
    REGISTER: 'registro',
    LOGIN: 'login',
    EMPRESA: 'empresa',
    USUARIO: 'usuario',
    LOCALES: 'locales',
    UPDATE_EMPRESA: (id) => `empresa/${id}`,
    GET_EMPRESA: (id) => `empresa/${id}`,
    // Puedes agregar más endpoints aquí
  }
};

// Función helper para construir URLs completas
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}/${endpoint}`;
};
