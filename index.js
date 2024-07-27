const express = require('express');
const EnvLoader = require('./src/config/environment');
const { connectDB } = require('./src/config/db');
const registerRoutes = require('./src/routes/registerRoutes'); 
const verifyDataRoutes = require('./src/routes/verifyDataRoutes'); 
const loadDataRoutes = require('./src/routes/loadDataRoutes'); 


const envLoader = new EnvLoader(); 

const app = express();
app.use(express.json());

const PORT = envLoader.get('PORT') || 3000;

// Conectar a la base de datos
connectDB().then(() => {
  // Definir las rutas
  app.use('/api/registers', registerRoutes);
  app.use('/api/verifyData', verifyDataRoutes); 
  app.use('/api/load', loadDataRoutes);

  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
