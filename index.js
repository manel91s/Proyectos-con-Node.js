const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// Crear la conexión a la BD
const db = require('./config/db');

//Importar el modelo
require('./models/Proyectos');

//Importar el modelo
require('./models/Proyectos');
db.sync()
  .then(() => console.log("conectado"))
  .catch( error => console.log(error))

// crear una app de express
const app = express();

//Cargar los archivos estaticos
app.use(express.static('public'))

// Habilitar Pug
app.set('view engine', 'pug');

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended:true}))

app.use('/', routes());

app.listen(3000);