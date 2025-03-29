const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permite solicitudes desde el frontend
app.use(bodyParser.json()); // Para manejar JSON en las peticiones

// Importar rutas
const elementosRoutes = require('./routes/elementos');
app.use('/api/elementos', elementosRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
