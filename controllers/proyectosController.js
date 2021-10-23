exports.proyectosHome = (req, res) => {
    res.render('index', {
        nombrePagina: 'Proyectos'
    });
};

exports.formularioProyecto = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    });
};


exports.nuevoProyecto = (req, res) => {
    
    //validar que tengamos algo en el input
    const { nombre } = req.body;

    console.log(nombre);
    
    let errores = [];

    if(nombre == '') {
        errores.push({'texto': 'Agrega un nombre al proyecto'})
    }

    //si hay errores

    if(errores.length>0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores
        })
    }
};