const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');

//Importar express validator
const { body } = require('express-validator');

module.exports = function() {
    //ruta para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto)
    return router;
}  
