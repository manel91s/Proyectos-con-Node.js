const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Referencia al Modelo donde vamos Autenticar
const Usuario = require('../models/Usuarios');

// local strategy - Login con credenciales propios (usuario y password)
passport.use(
    new LocalStrategy(
        // por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email, password, done) => {
            try {
                const usuario = await Usuario.findOne({
                    where: { 
                        email,
                        activo: 1
                    }
                })
                // El usuario exise, password incorrecto
                if(!usuario.verificarPassword(password)) {
                   
                    return done(null, false, {
                        message : 'Password Incorrecto'
                    })
                }
                // El email existe, y el password correco
                return done(null, usuario);
            }catch(e) {
                // Ese usuario no existe
                return done(null, false, {
                    message : 'Esa cuenta no existe'
                })
            }
        }
    )
)
// Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
})

// Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
})

module.exports = passport;