// Modules
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

// Models
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

require("../models/FichaAtleta")
const FichaAtleta = mongoose.model("fichaAtletas")

// Helpers
const isUserAuth = require("../helpers/userAuth")
const atletaLogado = require("../helpers/eAtleta")

// Middleware Routes
router.get("/", atletaLogado, (req, res) => {
    res.redirect("/atleta/panel")
})

router.get("/panel", isUserAuth, (req, res, next) => {

    let userName = req.user.nome.split(" ")
    let dataNascimento = req.user.data_nascimento.getDate() + "/" + req.user.data_nascimento.getMonth() + "/" + req.user.data_nascimento.getFullYear()

    res.render("atleta/panel", {
        headTitle: "Painel do Atleta | ",
        user: {
            nome_completo: req.user.nome,
            primeiro_nome: userName[0],
            sobrenome: userName[1],
            id: req.user._id,
            data_nascimento: dataNascimento,
            email: req.user.email,
            genero: req.user.genero,
            eAtleta: true,
            imagem_perfil: req.user.imagem_perfil
        }
    })

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

    FichaAtleta.find({cpf: formData.cpf}).lean().then((fichas) => {

        let fichasEncontradas = fichas.length // Conta a quantidade de registros

        if(fichasEncontradas > 0) {

            req.flash("errorMessage", "Já existe um atleta cadastrado com este CPF, entre em contato com o administrador para verificar o problema")
            res.redirect("/")

            console.log(fichas)

        }else{
            
            // Atualizar usuário para atleta
            Usuario.findOne({email: formData.email}).then((atleta) => {
                
                let novaFicha = new FichaAtleta(formData)
    
                novaFicha.numero_registro = fichasEncontradas
                novaFicha.nivel_usuario = "atleta"
                novaFicha.save()

                atleta.nivel_usuario = "atleta"
                atleta.save()
                .then(() => {
                    
                    req.flash("successMessage", "Ficha cadastrada com sucesso!")
                    res.redirect("/atleta/panel")
                })
                .catch(err => {

                    req.flash("errorMessage", "Não foi possível criar a sua ficha, nenhum usuário associado à este email foi encontrado")
                    res.redirect("/")

                    console.log("Erro ao salvar ficha: " + err)
                })

            })
            .catch(err => {
                req.flash("errorMessage", "Erro ao associar ficha ao usuário desta conta")
                res.redirect("/atleta/cadastrar")

                console.log("Erro ao salvar ficha: " + err)
            })
        }
    })
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