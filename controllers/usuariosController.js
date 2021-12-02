const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en Uptask'
    })
}

exports.crearCuenta = async (req, res) => {
    //Leer los datos
    const { email, password} = req.body;

    try {
        //Crear el usuario
        await Usuarios.create({
            email,
            password
        });
        res.redirect('iniciar-sesion');
    } catch(e) {
         req.flash('error', e.errors.map(error => error.message));
         res.render('crearCuenta', {
             mensajes: req.flash(),
             nombrePagina: 'Crear Cuena en Uptask',
             email,
             password
         })
    }
}

exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes
    res.render('iniciarSesion', {
        nombrePagina: 'Inicia Sesión en Uptask',
        error: error
    })
}