import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "./generated/prisma/index.js";

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ============ ENDPOINT DE LOGIN ============
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar primero en la tabla usuario
    let user = await prisma.usuario.findFirst({
      where: { email: email }
    });

    if (user) {
      // Verificar contraseña (por ahora sin encriptar, igual que en tu BD)
      if (user.contrase_a === password) {
        return res.json({
          success: true,
          id: user.usuario_id,
          nombre: user.nombre,
          tipo: 'usuario',
          email: user.email
        });
      }
    }

    // Si no es usuario, buscar en empresa
    let empresa = await prisma.empresa.findFirst({
      where: { email: email }
    });

    if (empresa) {
      if (empresa.contrase_a === password) {
        return res.json({
          success: true,
          id: empresa.empresa_id,
          nombre: empresa.nombre,
          tipo: 'empresa',
          email: empresa.email
        });
      }
    }

    // Credenciales incorrectas
    return res.status(401).json({
      success: false,
      error: "Email o contraseña incorrectos"
    });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      success: false,
      error: "Error en el servidor"
    });
  }
});

// ============ ENDPOINT DE REGISTRO ============
app.post("/api/registro", async (req, res) => {
  const { tipo, nombre, email, password, accesibilidad } = req.body;

  try {
    if (tipo === 'usuario') {
      // Verificar si el email ya existe
      const existente = await prisma.usuario.findFirst({
        where: { email: email }
      });

      if (existente) {
        return res.status(400).json({
          success: false,
          error: "El email ya está registrado"
        });
      }

      // Crear nuevo usuario
      const nuevoUsuario = await prisma.usuario.create({
        data: {
          nombre: nombre,
          email: email,
          contrase_a: password,
          publicado: 1
        }
      });

      return res.json({
        success: true,
        id: nuevoUsuario.usuario_id,
        nombre: nuevoUsuario.nombre,
        tipo: 'usuario'
      });

    } else if (tipo === 'empresa') {
      // Verificar si el email ya existe
      const existente = await prisma.empresa.findFirst({
        where: { email: email }
      });
    
      if (existente) {
        return res.status(400).json({
          success: false,
          error: "El email ya está registrado"
        });
      }
    
      // Crear nueva empresa
      const nuevaEmpresa = await prisma.empresa.create({
        data: {
          nombre: nombre,
          email: email,
          contrase_a: password,
          publicado: 1,
          accesibilidad: accesibilidad ? JSON.stringify(accesibilidad) : null
        }
      });
    
      // Guardar datos de accesibilidad en la tabla separada
      if (accesibilidad) {
        // Procesar cada nivel de accesibilidad (a, b, c, d)
        Object.keys(accesibilidad).forEach(async (nivel) => {
          const nivelData = accesibilidad[nivel];
          await prisma.accesibilidad.create({
            data: {
              empresa_id: nuevaEmpresa.empresa_id,
              pasillos: nivelData.pasillos ? "Sí" : "No",
              rampa: nivelData.ramp ? "Sí" : "No",
              baño_adaptado: "No", // Por defecto, puedes agregarlo al frontend si necesitas
              ascensor: nivelData.elevator ? 1 : 0,
              accesibilidad: nivel // a, b, c, d
            }
          });
        });
      }
    
      return res.json({
        success: true,
        id: nuevaEmpresa.empresa_id,
        nombre: nuevaEmpresa.nombre,
        tipo: 'empresa'
      });
    }

    return res.status(400).json({
      success: false,
      error: "Tipo de usuario no válido"
    });

  } catch (error) {
    console.error("Error en registro:", error);
    return res.status(500).json({
      success: false,
      error: "Error al registrar usuario"
    });
  }
});

// ============ ENDPOINT PARA BUSCAR EMPRESAS ============
app.get("/api/empresas/buscar", async (req, res) => {
  const { q, filtro } = req.query; // q = término de búsqueda, filtro = tipo de accesibilidad

  try {
    let whereClause = {};
    
    // Si hay término de búsqueda, buscar en nombre de empresa
    if (q) {
      whereClause.nombre = {
        contains: q,
        mode: 'insensitive'
      };
    }

    // Obtener empresas con sus datos de accesibilidad
    const empresas = await prisma.empresa.findMany({
      where: whereClause,
      include: {
        // Aquí necesitarás hacer un join con la tabla accesibilidad
        // Por ahora, devolvemos las empresas básicas
      }
    });

    // Si hay filtro de accesibilidad, filtrar los resultados
    let empresasFiltradas = empresas;
    if (filtro) {
      // Obtener IDs de empresas que tienen la accesibilidad solicitada
      const empresasConAccesibilidad = await prisma.accesibilidad.findMany({
        where: {
          OR: [
            { pasillos: { contains: filtro, mode: 'insensitive' } },
            { rampa: { contains: filtro, mode: 'insensitive' } },
            { baño_adaptado: { contains: filtro, mode: 'insensitive' } },
            { accesibilidad: { contains: filtro, mode: 'insensitive' } }
          ]
        },
        select: { empresa_id: true }
      });

      const idsEmpresas = empresasConAccesibilidad.map(item => item.empresa_id);
      empresasFiltradas = empresas.filter(empresa => idsEmpresas.includes(empresa.empresa_id));
    }

    // Agregar información de accesibilidad a cada empresa
    const empresasConInfo = await Promise.all(
      empresasFiltradas.map(async (empresa) => {
        const accesibilidadData = await prisma.accesibilidad.findMany({
          where: { empresa_id: empresa.empresa_id }
        });
        
        return {
          ...empresa,
          servicios_accesibilidad: accesibilidadData
        };
      })
    );

    res.json({ 
      success: true, 
      empresas: empresasConInfo,
      total: empresasConInfo.length
    });

  } catch (error) {
    console.error("Error en búsqueda:", error);
    res.status(500).json({ 
      success: false, 
      error: "Error al buscar empresas" 
    });
  }
});

// ============ ENDPOINT PARA OBTENER TODAS LAS EMPRESAS CON ACCESIBILIDAD ============
app.get("/api/empresas", async (req, res) => {
  try {
    const empresas = await prisma.empresa.findMany({
      where: { publicado: 1 } // Solo empresas publicadas
    });

    // Agregar información de accesibilidad
    const empresasConAccesibilidad = await Promise.all(
      empresas.map(async (empresa) => {
        const accesibilidadData = await prisma.accesibilidad.findMany({
          where: { empresa_id: empresa.empresa_id }
        });
        
        return {
          ...empresa,
          servicios_accesibilidad: accesibilidadData
        };
      })
    );

    res.json({ 
      success: true, 
      empresas: empresasConAccesibilidad,
      total: empresasConAccesibilidad.length
    });

  } catch (error) {
    console.error("Error al obtener empresas:", error);
    res.status(500).json({ 
      success: false, 
      error: "Error al obtener empresas" 
    });
  }
});

// ============ ENDPOINT PARA FILTROS DE ACCESIBILIDAD ============
app.get("/api/filtros/accesibilidad", async (req, res) => {
  try {
    // Obtener todas las opciones de accesibilidad disponibles
    const accesibilidadOptions = await prisma.accesibilidad.findMany({
      select: {
        pasillos: true,
        rampa: true,
        baño_adaptado: true,
        ascensor: true,
        accesibilidad: true
      }
    });

    // Crear lista única de opciones
    const opciones = {
      pasillos: [...new Set(accesibilidadOptions.map(item => item.pasillos))],
      rampa: [...new Set(accesibilidadOptions.map(item => item.rampa))],
      baño_adaptado: [...new Set(accesibilidadOptions.map(item => item.baño_adaptado))],
      ascensor: [...new Set(accesibilidadOptions.map(item => item.ascensor ? 'Sí' : 'No'))],
      niveles: [...new Set(accesibilidadOptions.map(item => item.accesibilidad))]
    };

    res.json({ 
      success: true, 
      filtros: opciones
    });

  } catch (error) {
    console.error("Error al obtener filtros:", error);
    res.status(500).json({ 
      success: false, 
      error: "Error al obtener filtros" 
    });
  }
});

// ============ ENDPOINT PARA GUARDAR/ACTUALIZAR EMPRESA ============
app.post("/api/empresa", async (req, res) => {
  const { guarda, empresa_id, nombre, email, contraseña } = req.body;

  if (guarda == 1) {
    try {
      const empresa = await prisma.empresa.upsert({
        where: { empresa_id: empresa_id },
        update: {
          nombre: nombre,
          email: email,
          contrase_a: contraseña
        },
        create: {
          empresa_id: empresa_id,
          nombre: nombre,
          email: email,
          contrase_a: contraseña,
          publicado: 1
        }
      });

      res.json({ mensaje: "Registro guardado con éxito ✅", empresa });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error al guardar" });
    }
  } else {
    res.status(400).json({ mensaje: "No se especificó acción válida" });
  }
});

// ============ ENDPOINT PARA GUARDAR/ACTUALIZAR USUARIO ============
app.post("/api/usuario", async (req, res) => {
  const { guarda, usuario_id, nombre, email, contraseña } = req.body;

  if (guarda == 1) {
    try {
      const usuario = await prisma.usuario.upsert({
        where: { usuario_id: usuario_id },
        update: {
          nombre: nombre,
          email: email,
          contrase_a: contraseña
        },
        create: {
          usuario_id: usuario_id,
          nombre: nombre,
          email: email,
          contrase_a: contraseña,
          publicado: 1
        }
      });

      res.json({ mensaje: "Usuario guardado/modificado con éxito", usuario });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error al guardar usuario" });
    }
  } else {
    res.status(400).json({ mensaje: "Acción inválida" });
  }
});

// ============ ENDPOINT PARA ACTUALIZAR PERFIL DE EMPRESA ============
app.put("/api/empresa/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, email, descripcion, direccion, contacto, accesibilidad } = req.body;

  try {
    const empresaActualizada = await prisma.empresa.update({
      where: { empresa_id: parseInt(id) },
      data: {
        nombre: nombre,
        email: email,
        accesibilidad: accesibilidad ? JSON.stringify(accesibilidad) : null
      }
    });

    res.json({ 
      success: true, 
      mensaje: "Perfil actualizado con éxito", 
      empresa: empresaActualizada 
    });
  } catch (error) {
    console.error("Error al actualizar empresa:", error);
    res.status(500).json({ 
      success: false, 
      error: "Error al actualizar el perfil" 
    });
  }
});

// ============ ENDPOINT PARA OBTENER DATOS DE EMPRESA ============
app.get("/api/empresa/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const empresa = await prisma.empresa.findUnique({
      where: { empresa_id: parseInt(id) }
    });

    if (empresa) {
      // Parsear el JSON de accesibilidad si existe
      if (empresa.accesibilidad) {
        empresa.accesibilidad = JSON.parse(empresa.accesibilidad);
      }
      res.json({ success: true, empresa });
    } else {
      res.status(404).json({ success: false, error: "Empresa no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener empresa:", error);
    res.status(500).json({ success: false, error: "Error al obtener datos" });
  }
});

// ============ ENDPOINT PARA OBTENER LOCALES ============
app.get("/api/accesibilidad", async (req, res) => {
  try {
    const accesibilidad = await prisma.accesibilidad.findMany();
    res.json({ success: true, accesibilidad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error al obtener accesibilidad" });
  }
});

// ============ ENDPOINT PARA OBTENER LOCAL POR ID ============
app.get("/api/accesibilidad/:id", async (req, res) => {
  try {
    const accesibilidad = await prisma.locales.findUnique({
      where: { local_id: parseInt(req.params.id) }
    });
    
    if (local) {
      res.json({ success: true, local });
    } else {
      res.status(404).json({ success: false, error: "Local no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error al obtener local" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Node.js corriendo en http://localhost:${PORT}`);
  console.log(`Prisma Studio: npx prisma studio`);
});

// Manejo de cierre limpio
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

