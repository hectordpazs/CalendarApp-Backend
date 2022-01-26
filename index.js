const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config');
require('dotenv').config();

//crear el servidor de express
const app = express();

// Base de Datos
dbConnection();

//CORS
app.use(cors());

//directorio publico
app.use(express.static('public'));

// lectura y parseo del body
app.use(express.json());


//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events' , require('./routes/events'));


//escuchar peticiones

const port = process.env.PORT||'3001';

app.listen(port, '0.0.0.0', ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});