// Configuración de la API
export const API_CONFIG = {
  // URL base del backend (ajusta según tu configuración)
  BASE_URL: 'http://localhost/NAVI--main/backend/index.php',
  
  // Endpoints
  ENDPOINTS: {
    REGISTER: 'registro.php',
    LOGIN: 'login.php',
    // Puedes agregar más endpoints aquí
  }
};

// Función helper para construir URLs completas
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}/${endpoint}`;
};
