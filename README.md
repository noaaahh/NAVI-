#  Backend SAVI - Node.js + Express + Prisma

Backend completo con Node.js, Express y Prisma ORM para la aplicación SAVI.

## Stack Tecnológico

- **Node.js** - JavaScript
- **Express** - Framework web
- **Prisma** - ORM para MySQL
- **MySQL** - Base de datos relacional
- **CORS** - Habilitado para comunicación con frontend

### 1. Instalar dependencias
```bash
npm install
```
### 2. Configurar base de datos
Asegúrate de que MySQL esté corriendo y edita `.env`:
```env
DATABASE_URL="mysql://root:@localhost:3306/savi"
```

### 3. Generar cliente de Prisma
```bash
npx prisma generate
```

### 4. Sincronizar con base de datos existente (opcional)
```bash
npx prisma db pull
npx prisma generate
```

### 5. Iniciar servidor
```bash
node server.js
```

El servidor estará disponible en: **http://localhost:3000**

## Endpoints Disponibles

### Autenticación
- `POST /api/login` - Iniciar sesión
- `POST /api/registro` - Registrar usuario/empresa

### Usuarios y Empresas
- `POST /api/usuario` - Guardar/actualizar usuario
- `POST /api/empresa` - Guardar/actualizar empresa

### Locales
- `GET /api/locales` - Obtener todos los locales
- `GET /api/locales/:id` - Obtener local por ID

## Prisma Studio

Visualizador de base de datos:
```bash
npx prisma studio
```
Abre en: **http://localhost:5555**

## Estructura

```
backendd/
├── prisma/
│   └── schema.prisma    # Schema de Prisma
├── generated/
│   └── prisma/          # Cliente generado
├── server.js            # Servidor principal
├── package.json         # Dependencias
└── .env                 # Variables de entorno
```

## Scripts NPM

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

##  Dependencias

- express
- cors
- body-parser
- @prisma/client
- bcryptjs (para futuro)

## Seguridad

⚠️ **Nota**: Las contraseñas actualmente NO están encriptadas.  
##  Notas
- Puerto por defecto: **3000**
- Base de datos: **savi**
- Las tablas se obtienen automáticamente de MySQL usando `prisma db pull`

