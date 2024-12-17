const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
require('dotenv').config(); // Carga las variables de entorno
const soluRoutes = require('./routes/soluroutes'); // Importa las rutas
//const assistantRoutes = require('./routes/assistantRoutes');
const port = process.env.PORT || 3000; // Puerto configurable desde variables de entorno

// Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta views
app.use(express.static(path.join(__dirname, 'views')));

// Usa Helmet para configurar las cabeceras de seguridad
app.use(helmet());

// Configura las rutas
app.use('/', soluRoutes);
//app.use('/', assistantRoutes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send('Página no encontrada');
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal. Por favor, inténtalo de nuevo más tarde.');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});