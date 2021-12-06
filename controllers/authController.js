const passport = require('passport');
const Usuarios = require('../models/Usuarios');

const crypto = require('crypto');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
});

// Función para revisar si el usuario estal lgueado o no
exports.usuarioAutenticado = (req, res, next) => {
    
    //si el usuario esta autenticado, adelante
    if(req.isAuthenticated()) {
        return next();
    }
    // si no esta autenticado, redirigir al formulario
    return res.redirect('/iniciar-sesion')
}

//Función para cerrar sesión
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion'); //al cerrar sesión nos lleva al login
    })
}

// genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {
    //Verificar que el usuario exista
    const {email} = req.body;
    const usuario = await Usuarios.findOne({where: {email}})

    //Si no existe el usuarios
    if(!usuario) {
        req.flash('error', 'No existe esa cuenta');
        res.render('reestablecer', {
            nombrePagina: 'Restablecer tu Contraseña',
            mensajes: req.flash()
        })
    }
    // usuario existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    
    //Guardarlos en la base de datos
    await usuario.save();
    
    // url de reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}}`;
    console.log(resetUrl);
}

exports.validarToken= async(req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });

    // sino encuentra el usuario
    if(!usuario) {
        req.flash('error', 'No Vàlido');
        res.redirect('/reestablecer');
    }

    // Formulario para generar el password
    res.render('resetPassword', {
        nombrePagina: 'Reestablecer Pagina'
    })
    
}