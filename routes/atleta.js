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

router.get("/cadastrar", isUserAuth, (req, res) => {
    
    res.render("atleta/cadastro_atleta", {
        user: {
            nome_completo: req.user.nome,
            id: req.user._id,
            data_nascimento: req.user.data_nascimento,
            email: req.user.email,
            genero: req.user.genero
        }
    })
})

router.post("/cadastrar", isUserAuth, (req, res) => {
    let formData = {
    // Dados pessoais
        nome: req.body.nome,
        cpf: req.body.cpf,
        identidade: req.body.identidade,
        expedidor_identidade: req.body.expedidor_identidade,
        emissao_identidade: req.body.emissao_identidade,
        reservista: req.body.reservista,
        expedidor_reservista: req.body.expedidor_reservista,
        data_nascimento: req.body.data_nascimento,
        genero: req.body.genero,
        naturalidade: req.body.naturalidade,
        nacionalidade: req.body.nacionalidade,

    // Escolaridade
        grau_ensino: req.body.grau_ensino,
        instituicao_ensino: req.body.instituicao_ensino,

    // Filiação
        pai: req.body.pai,
        mae: req.body.mae,

    // Endereço residencial
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado,
        cep: req.body.cep,

    // Contato
        email: req.body.email,
        telefone: req.body.telefone,
        celular: req.body.celular,
        tipo_contato_extra: req.body.tipo_contato_extra,
        contato_extra: req.body.contato_extra
    }

    FichaAtleta.find({cpf: formData.cpf}).lean().then((ficha) => {
        if(ficha.length > 0) {
            console.log(ficha)
            req.flash("errorMessage", "Já existe um atleta cadastrado com este CPF, entre em contato com o administrador")
            res.redirect("/")
        }else{
            // Buscar quantidade de fichas para dar um numero de registro
            const novaFicha = new FichaAtleta(formData)

            FichaAtleta.find().lean().then((fichas) => {

                let fichasEncontradas = fichas.length
                console.log(fichasEncontradas)
                console.log(fichas)

                novaFicha.numero_registro = fichasEncontradas
                novaFicha.save()
                .then(() => {
                    req.flash("successMessage", "Ficha cadastrada com sucesso!")
                    res.redirect("/user/panel")
                })
                .catch(err => {
                    req.flash("errorMessage", "Erro ao salvar ficha, tente novamente")
                    res.redirect("/atleta/cadastrar")

                    console.log("Erro ao salvar ficha: " + err)
                })

            })
            .catch(err => {
                console.log("Erro ao buscar pela quantidade de fichas: " + err)
            })
        }
    })
    console.table(formData)
})

router.get("/ficha", isUserAuth, (req, res, next) => {
    
    FichaAtleta.findOne({nome: req.user.nome}).lean().then((ficha) => {
        if(ficha) {
            res.render("atleta/ficha_atleta", {
                dadosFicha: ficha
            })
        }else{
            req.flash("errorMessage", "Nenhuma ficha encontrada, cadastre uma ficha!")
            res.redirect("/atleta/cadastrar")
        }

    }).catch(err => {
        req.flash("errorMessage", "Houve um erro ao buscar a sua ficha, entre em contato com o administrador")
        res.redirect("/")
    })
    
})

// Router Export
module.exports = router