# 🔗 Integración Frontend (React) + Backend (PHP)

## 📋 Resumen de la Integración

Tu aplicación ahora está completamente integrada con:
- **Frontend**: React con Vite
- **Backend**: PHP con MySQL
- **Comunicación**: API REST con JSON

## 🚀 Cómo Ejecutar la Aplicación

### 1. **Backend (PHP)**
```bash
# Asegúrate de que XAMPP esté ejecutándose
# El backend debe estar en: http://localhost/NAVI--main/backend/
```

### 2. **Frontend (React)**
```bash
cd frontend
npm install
npm run dev
# La aplicación se ejecutará en: http://localhost:5173
```

## 📁 Estructura de Archivos Creados

### **Backend**
```
backend/
├── cors.php                    # Configuración CORS
└── api/
    ├── registro.php            # Endpoint de registro
    └── login.php              # Endpoint de login
```

### **Frontend**
```
frontend/src/
├── services/
│   └── api.js                 # Servicio de API
├── hooks/
│   └── useAuth.js             # Hook de autenticación
├── config/
│   └── api.js                 # Configuración de API
└── components/
    ├── ModalLogin.jsx         # Modal de login (actualizado)
    └── RegistroPersonal.jsx   # Formulario de registro (actualizado)
```

## 🔧 Funcionalidades Implementadas

### ✅ **Autenticación**
- **Login**: Usuarios y empresas pueden iniciar sesión
- **Registro**: Formulario de registro personal
- **Sesión persistente**: Los usuarios permanecen logueados
- **Logout**: Cerrar sesión y limpiar datos

### ✅ **API Endpoints**
- `POST /api/registro.php` - Registro de usuarios/empresas
- `POST /api/login.php` - Inicio de sesión

### ✅ **Validaciones**
- Validación de email
- Validación de contraseñas (mínimo 6 caracteres)
- Verificación de contraseñas coincidentes
- Manejo de errores del servidor

## 🛠️ Configuración de la Base de Datos

Asegúrate de que tu base de datos `savi` tenga las tablas:

```sql
-- Tabla de usuarios
CREATE TABLE usuario (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

-- Tabla de empresas
CREATE TABLE empresa (
    empresa_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);
```

## 🔄 Flujo de la Aplicación

1. **Usuario visita la app** → Ve la página de inicio
2. **Clic en "Registrarse"** → Va al selector de registro
3. **Selecciona "Registro personal"** → Formulario de registro
4. **Completa el formulario** → Se envía al backend PHP
5. **Registro exitoso** → Redirige al usuario logueado
6. **Login** → Modal de login conectado al backend

## 🐛 Solución de Problemas

### **Error de CORS**
Si ves errores de CORS, verifica que:
- El archivo `cors.php` esté incluido en tus endpoints
- La URL del backend sea correcta en `frontend/src/config/api.js`

### **Error de Conexión**
Si no se conecta al backend:
- Verifica que XAMPP esté ejecutándose
- Confirma que la URL en `API_CONFIG.BASE_URL` sea correcta
- Revisa la consola del navegador para errores

### **Error de Base de Datos**
Si hay errores de BD:
- Verifica que la base de datos `savi` exista
- Confirma que las tablas `usuario` y `empresa` estén creadas
- Revisa la configuración en `backend/conexion.php`

## 📝 Próximos Pasos

1. **Agregar más endpoints** (editar perfil, buscar locales, etc.)
2. **Implementar registro de empresas**
3. **Agregar validaciones del lado del servidor**
4. **Implementar JWT para autenticación más segura**
5. **Agregar manejo de archivos (imágenes de perfil)**

## 🎯 URLs Importantes

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost/NAVI--main/backend/api/
- **Base de datos**: localhost/phpmyadmin (usuario: root, sin contraseña)

¡Tu aplicación ya está completamente integrada! 🎉
