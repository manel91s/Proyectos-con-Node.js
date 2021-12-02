const passport = require('passport');


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
