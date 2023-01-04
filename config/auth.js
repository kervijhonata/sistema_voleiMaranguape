// Sistema de Autenticação

// Modules
const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// Models
    // Usuários
    require("../models/Usuario")
    const Usuario = mongoose.model("usuarios")

// Export
module.exports = function( passport ) {
    passport.use(new localStrategy({
        usernameField: 'user_email',
        passwordField: 'user_password'
    }, (email, password, done) => {
        
        Usuario.findOne({email: email}).then( (usuario) => {

            if(!usuario) {
                return done(null, false, {message: "Esta conta não existe"})
            }

            bcrypt.compare(password, usuario.senha, (error, isAuth) => {
                if(error) {
                    return done(error)
                }
                if(isAuth) {
                    return done(null, usuario, {message: `${usuario.nome} autenticado com sucesso!`})
                }
                else {
                    return done(null, false, {message: "Senha incorreta, tente novamente!"})
                }
            })

        }).catch( err => console.log("Erro ao tentar fazer login: " + err))
    }))

    // Serialization
    passport.serializeUser( (usuario, done) => {
        done(null, usuario.id)
    })

    // Desserialization
    passport.deserializeUser( (id, done) => {
        Usuario.findById(id, (err, usuario) => {
            done(err, usuario)
        })
    })
}
