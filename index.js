const express = require('express');
const EnvLoader = require('./src/config/environment');
const { connectDB } = require('./src/config/db');
//Agregado
require('dotenv').config();
const registerRoutes = require('./src/routes/registerRoutes'); 
const verifyDataRoutes = require('./src/routes/verifyDataRoutes'); 
const loadDataRoutes = require('./src/routes/loadDataRoutes'); 
const emails = require('./src/routes/sendEmailRoutes'); 
//Agregado
const bodyParser = require('body-parser');
const loginRoutes = require('./src/routes/loginRoutes');


const envLoader = new EnvLoader(); 

const app = express();
app.use(express.json());
//Agregado
app.use(bodyParser.json());

const PORT = envLoader.get('PORT') || 3001;
//  allow access on origins
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Conectar a la base de datos
connectDB().then(() => {
  // Definir las rutas
  app.use('/api/registers', registerRoutes);
  app.use('/api/verifyData', verifyDataRoutes); 
  app.use('/api/load', loadDataRoutes); 
  app.use('/api/emails',emails); 
  app.use('/api/login', loginRoutes)//cgzf;
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
