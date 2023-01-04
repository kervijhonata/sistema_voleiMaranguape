// Modules
const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

// Models
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

require("../models/FichaAtleta")
const FichaAtleta = mongoose.model("fichaAtletas")

// Helpers
const isUserAuth = require("../helpers/userAuth")

// Middleware Routes
router.get("/", isUserAuth, (req, res) => {
    res.redirect("/user/panel")
})

router.get("/panel", isUserAuth, (req, res) => {

    let userName = req.user.nome.split(" ")
    let dataNascimento = req.user.data_nascimento.getDate() + "/" + req.user.data_nascimento.getMonth() + "/" + req.user.data_nascimento.getFullYear()
    
    res.render("user/panel", {
        headTitle: "Seu Painel | ",
        user: {
            nome_completo: req.user.nome,
            primeiro_nome: userName[0],
            sobrenome: userName[1],
            id: req.user._id,
            data_nascimento: dataNascimento,
            email: req.user.email,
            genero: req.user.genero,
            eAtleta: true
        }
    })
    
})

// Router Export
module.exports = router