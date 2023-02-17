const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("../models/Usuario")
const Usuario = mongoose.model('usuarios')

require("../models/FichaAtleta")
const FichaAtleta = mongoose.model('fichaAtletas')

// Helpers
const isUserAuth = require("../helpers/userAuth")
const adminLogado = require("../helpers/eAdmin")

// Middleware
router.get("/", adminLogado, (req, res, next) => {
    res.render("admin/panel", {
        headTitle: "Admin - "
    })
})


router.get("/panel", adminLogado, (req, res, next) => {
    res.render("admin/panel", {
        headTitle: "Painel do Admin - "
    })
})

router.get("/lista/usuarios", (req, res, next) => {
    Usuario.find().lean().then((usuarios) => {

        const listaUsuarios = []

        function longDateToShort(longDate) {
            
            let dia = longDate.getDate()
            let mes = longDate.getMonth()
            let ano = longDate.getFullYear()

            dia < 9 ? dia = '0' + dia : dia
            mes < 9 ? mes = '0' + mes : mes
            
            return `${dia}/${mes}/${ano}`
            
        }

        usuarios.forEach(usuario => {
            usuario.data_nascimento = longDateToShort(usuario.data_nascimento)
            listaUsuarios.push(usuario)
        })

        res.render("admin/lista_usuarios", {
            usuario: listaUsuarios
        })

    }).catch((err) => {
        req.flash("errorMessage", "Houve um erro ao listar os usuários")
        res.redirect("/admin/panel")
    })
})

router.get("/lista/atletas", (req, res, next) => {
    FichaAtleta.find().lean().then( fichas =>  {
        
        let fichaAtletas = []
        fichas.forEach((ficha) => {
            fichaAtletas.push(ficha)
        })

        res.render("admin/lista_atletas", {
            fichas: fichaAtletas
        })

    }).catch(err => {
        req.flash("errorMessage", "Ocorreu um erro ao listar a relação de atletas")
        res.redirect("/admin/panel")
    })
})

// 
module.exports = router