# Integración Frontend (React) + Backend (Node.js)

## 📋 Resumen de la Integración

Tu aplicación ahora está completamente integrada con:
- **Frontend**: React con Vite
- **Backend**: Node.js + Express + Prisma ORM
- **Base de Datos**: MySQL
- **Comunicación**: API REST con JSON
- **ORM**: Prisma para gestión de base de datos
- **Visualizador**: Prisma Studio

---

## Cómo Ejecutar la Aplicación

### **Opción 1: Usar el script de inicio automático (Recomendado)**

#### Windows:
```bash
# Asegúrate de que MySQL esté corriendo en XAMPP
start-app.bat
```

#### Linux/Mac:
```bash
# Asegúrate de que MySQL esté corriendo
chmod +x start-app.sh
./start-app.sh
```

### **Opción 2: Iniciar manualmente**

#### 1. **Iniciar MySQL**
- Abre XAMPP y presiona "Start" en MySQL

#### 2. **Backend (Node.js)**
```bash
cd backendd
npm install          # Solo la primera vez
node server.js       # Inicia el servidor backend
```

#### 3. **Frontend (React)**
```bash
cd frontend
npm install          # Solo la primera vez
npm run dev          # Inicia el servidor frontend
```

#### 4. **Prisma Studio (Opcional)**
```bash
cd backendd
npx prisma studio    # Abre el visualizador de base de datos
```

---

## 📁 Estructura del Proyecto

```
NAVI--main/
├── backendd/
│   ├── prisma/
│   │   └── schema.prisma          # Schema de Prisma
│   ├── generated/
│   │   └── prisma/                # Cliente de Prisma generado
│   ├── server.js                  # Servidor principal Node.js
│   ├── guardaEmpresa.js          # (Legacy - integrado en server.js)
│   ├── guardaUsuario.js          # (Legacy - integrado en server.js)
│   ├── package.json              # Dependencias del backend
│   └── .env                      # Variables de entorno
│
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js            # Servicio de API
│   │   ├── hooks/
│   │   │   └── useAuth.js        # Hook de autenticación
│   │   ├── config/
│   │   │   └── api.js            # Configuración de API (URLs)
│   │   ├── ModalLogin.jsx        # Modal de login
│   │   ├── Registro*.jsx         # Formularios de registro
│   │   └── ...                   # Otros componentes
│   └── package.json
│
├── start-app.bat                 # Script de inicio Windows
├── start-app.sh                  # Script de inicio Linux/Mac
└── INTEGRACION_FRONTEND_BACKEND.md
```

---

## 🔌 API Endpoints Disponibles

### **Autenticación**

#### `POST /api/login`
Iniciar sesión de usuario o empresa
```json
// Request
{
  "email": "usuario@example.com",
  "password": "contraseña123"
}

// Response (éxito)
{
  "success": true,
  "id": 1,
  "nombre": "Juan Pérez",
  "tipo": "usuario",  // o "empresa"
  "email": "usuario@example.com"
}
```

#### `POST /api/registro`
Registrar nuevo usuario o empresa
```json
// Request
{
  "tipo": "usuario",  // o "empresa"
  "nombre": "Juan Pérez",
  "email": "usuario@example.com",
  "password": "contraseña123"
}

// Response (éxito)
{
  "success": true,
  "id": 1,
  "nombre": "Juan Pérez",
  "tipo": "usuario"
}
```

### **Gestión de Datos**

#### `POST /api/empresa`
Guardar o actualizar empresa
```json
{
  "guarda": 1,
  "empresa_id": 1,
  "nombre": "Mi Empresa",
  "email": "empresa@example.com",
  "contraseña": "pass123"
}
```

#### `POST /api/usuario`
Guardar o actualizar usuario
```json
{
  "guarda": 1,
  "usuario_id": 1,
  "nombre": "Juan",
  "email": "juan@example.com",
  "contraseña": "pass123"
}
```

#### `GET /api/locales`
Obtener todos los locales
```json
// Response
{
  "success": true,
  "locales": [...]
}
```

#### `GET /api/locales/:id`
Obtener un local específico
```json
// Response
{
  "success": true,
  "local": {...}
}
```

---

## 🗄️ Base de Datos

### **Tablas en MySQL (Base de datos: `savi`)**

#### `usuario`
```sql
CREATE TABLE usuario (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    publicado TINYINT DEFAULT 1
);
```

#### `empresa`
```sql
CREATE TABLE empresa (
    empresa_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    publicado TINYINT DEFAULT 1
);
```

#### `locales`
```sql
CREATE TABLE locales (
    local_id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    contacto TINYINT,
    accesibilidad VARCHAR(255)
);
```

### **Prisma Studio**
Para visualizar y editar datos en la base de datos:
```bash
cd backendd
npx prisma studio
```
Abre en: **http://localhost:5555**

---

## 🔧 Configuración

### **Variables de Entorno (backendd/.env)**
```env
DATABASE_URL="mysql://root:@localhost:3306/savi"
```

### **Configuración del Frontend (frontend/src/config/api.js)**
```javascript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api',
  ENDPOINTS: {
    REGISTER: 'registro',
    LOGIN: 'login',
    EMPRESA: 'empresa',
    USUARIO: 'usuario',
    LOCALES: 'locales',
  }
};
```

---

## 🔄 Flujo de Autenticación

1. **Usuario abre la aplicación**
2. **Clic en "Iniciar Sesión"** → Abre modal de login
3. **Ingresa credenciales** → Se envía POST a `/api/login`
4. **Backend verifica** en tablas `usuario` y `empresa`
5. **Si es válido** → Devuelve datos del usuario
6. **Frontend guarda** en localStorage
7. **Usuario autenticado** → Redirige según tipo (usuario/empresa)

---

## 🛠️ Comandos Útiles de Prisma

```bash
# Ver la base de datos en el navegador
npx prisma studio

# Sincronizar schema con la base de datos existente
npx prisma db pull

# Generar el cliente de Prisma
npx prisma generate

# Aplicar cambios del schema a la base de datos
npx prisma db push

# Crear una migración
npx prisma migrate dev --name nombre_migracion
```

---

## 🐛 Solución de Problemas

### **Error: Can't reach database server**
- ✅ Asegúrate de que MySQL esté corriendo en XAMPP
- ✅ Verifica que la base de datos `savi` exista
- ✅ Confirma que las credenciales en `.env` sean correctas

### **Error: fetch failed / Connection refused**
- ✅ Verifica que el backend esté corriendo en `http://localhost:3000`
- ✅ Revisa la consola del backend para errores
- ✅ Confirma que `frontend/src/config/api.js` tenga la URL correcta

### **Error: Module not found**
- ✅ Ejecuta `npm install` en `backendd/` y `frontend/`
- ✅ Ejecuta `npx prisma generate` en `backendd/`

### **El login no funciona**
- ✅ Verifica que existan usuarios en la base de datos
- ✅ Confirma que las contraseñas coincidan (sin encriptar por ahora)
- ✅ Revisa la consola del navegador y del backend

---

## 🎯 URLs Importantes

| Servicio | URL |
|----------|-----|
| **Frontend** | http://localhost:5173 |
| **Backend API** | http://localhost:3000/api |
| **Prisma Studio** | http://localhost:5555 |

---

## 📝 Próximos Pasos Sugeridos

1. ✅ **Encriptación de contraseñas** (bcrypt)
2. ✅ **JWT para tokens de sesión**
3. ✅ **Validación de datos con Zod**
4. ✅ **Subida de imágenes**
5. ✅ **Paginación de resultados**
6. ✅ **Búsqueda y filtros**
7. ✅ **Gestión de locales (CRUD completo)**
8. ✅ **Sistema de membresías**

---

## 🎉 ¡Todo está integrado!

- ✅ Backend Node.js corriendo
- ✅ Frontend React conectado
- ✅ Prisma ORM configurado
- ✅ Base de datos MySQL lista
- ✅ Login funcional
- ✅ Registro funcional
- ✅ Prisma Studio disponible

**¡Tu aplicación NAVI está lista para usarse!** 🚀
