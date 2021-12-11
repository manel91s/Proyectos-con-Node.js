const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

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

        // crear una URL de confirmar
        const confirmarURL = `http://${req.headers.host}/confirmar/${email}`;
        //crear el objeto de usuario
        const usuario = {
            email
        }
        // enviar email
        try {
            await enviarEmail.enviar({
                usuario,
                subject: 'Confirma tu cuenta UpTask',
                confirmarURL,
                archivo : 'confirmar-cuenta'
            });
        }catch(e) {
            console.log(e);
        }
        
        
        // redirigir al usuario
        req.flash('correcto', 'Enviamos un correeo', 'confirma tu cuenta')
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

exports.formRestablecerPassword = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer tu Contraseña'
    })
}

// Cambia el estado de una cuenta
exports.confirmarCuenta = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            email: req.params.correo
        }
    });

    // Si no existe el usuario
    if(!usuario) {
        req.flash('error', 'No valido');
        res.redirect('/crear-cuenta');
    }

    usuario.activo = 1;
    await usuario.save();

    req.flash('correcto', 'Cuenta activada correctamente');
    res.redirect('/iniciar-sesion');


}



