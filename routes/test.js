// Modules
const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()

// Models
require("../models/FichaAtleta")
const FichaAtleta = mongoose.model("fichaAtletas")

// Routes
router.get("/", (req, res) => {
    res.render("test/index")
})

router.post("/", (req, res) => {
    const formData = req.body.text

    console.log(formData.length)

    if(formData == "" || typeof formData == undefined || formData.length == 0){
        req.flash('error_msg', `Received empty string`)
        req.flash('success_msg', `Received: ${formData} ${formData.length}`)
    }else{
    }

    res.redirect("/test")

})

router.get("/fichas", (req, res, next) => {
    FichaAtleta.find({}).lean().then((ficha) => {
        console.log("fichas: ")
        if(ficha.length > 0) {
            console.log("quantidade: " + ficha.length)
        }else{
            console.log("Nenhuma ficha encontrada")
        }
    })
    next()
})

router.get("/fichas/nova", (req, res, next) => {

    let dataHoje = new Date().getDate()

    let formData = {
        // Dados pessoais
            nome: "req.body.nome",
            cpf: "req.body.cpf",
            identidade: "req.body.identidade",
            expedidor_identidade: "req.body.expedidor_identidade",
            emissao_identidade: dataHoje,
            reservista: "req.body.reservista",
            expedidor_reservista: "req.body.expedidor_reservista",
            data_nascimento: dataHoje,
            genero: "req.body.genero",
            naturalidade: "req.body.naturalidade",
            nacionalidade: "req.body.nacionalidade",
    
        // Escolaridade
            grau_ensino: "req.body.grau_ensino",
            instituicao_ensino: "req.body.instituicao_ensino",
    
        // Filiação
            pai: "req.body.pai",
            mae: "req.body.mae",
    
        // Endereço residencial
            endereco: "req.body.endereco",
            bairro: "req.body.bairro",
            cidade: "req.body.cidade",
            estado: "req.body.estado",
            cep: "req.body.cep",

        // Contato
            email: "req.body.email",
            telefone: "req.body.telefone",
            celular: "req.body.celular",
            tipo_contato_extra: "req.body.tipo_contato_extra",
            contato_extra: "req.body.contato_extra",

        // Numero Reg
            numero_registro: 1 
        }

        const novaFicha = new FichaAtleta(formData).save().then(() => {
            console.log("Ficha salva com sucesso")
        }).catch(err => {
            console.log("Erro ao salvar ficha: " + err)
        })

})

// Export
module.exports = router