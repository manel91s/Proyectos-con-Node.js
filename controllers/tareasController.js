const Tareas = require('../models/Tareas');
const Proyectos = require('../models/Proyectos');

exports.agregarTarea = async (req,res) => {
    //Obtenemos el proyecto actual
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    })

    const {tarea} = req.body;

    // estado 0 = incompleto y ID de Proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    // Insertar en la base de datos
    const resultado = await Tareas.create({tarea, estado, proyectoId})

    if(!resultado) {
        return next();
    }

    //rediccionar
    res.redirect(`/proyectos/${req.params.url}`)

}


exports.cambiarEstadoTarea = async (req,res, next) => {
    const { id } = req.params;
    const tarea =  await Tareas.findOne({
        where: {
            id: id
        }
    })

    let estado = 0;

    if(tarea.estado === estado) {
        estado = 1;
    }
    tarea.estado = estado;

    await Tareas.update({}, {
        where: {
            id: id
        }
    })

    const resultado = await tarea.save();

    if(!resultado) return next();

    res.status(200).send('Todo bien...');

}

exports.cambiarEstadoTarea = async (req,res, next) => {
    const { id } = req.params;
    const tarea =  await Tareas.findOne({
        where: {
            id: id
        }
    })

    let estado = 0;

    if(tarea.estado === estado) {
        estado = 1;
    }
    tarea.estado = estado;

    await Tareas.update({}, {
        where: {
            id: id
        }
    })

    const resultado = await tarea.save();

    if(!resultado) return next();

    res.status(200).send('Todo bien...');
}

exports.eliminarTarea = async (req, res, next) => {
    
    const { id } = req.params;

    const resultado = await Tareas.destroy({
        where: {
            id
        }
    })

    if(!resultado) return next();

    res.status(200).send('Tarea eliminada Correctamente');
}
