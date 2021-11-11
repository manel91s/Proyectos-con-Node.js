const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');

//Importar express validator
const { body } = require('express-validator');
const { Router } = require('express');

module.exports = function() {
    //ruta para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto)

    // Listar Proyecto
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

    // Actualizar el proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar)
    router.post('/nuevo-proyecto/:id', 
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto)

    return router;
}  
