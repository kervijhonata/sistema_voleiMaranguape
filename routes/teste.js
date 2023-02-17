// Modules
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const router = express.Router()

// Multer
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/upload/'))
    },
    filename: function(req, file, cb) {
        const suffix = Date.now() + '-' + Math.round( Math.random() * 1E9 )
        cb(null, `${file.fieldname}-${suffix}.png`)
    }
})
const upload = multer({
    storage: storage
})



// Models
require("../models/FichaAtleta")
const FichaAtleta = mongoose.model("fichaAtletas")

require("../models/TesteUpload")
const TesteUpload = mongoose.model("testeUploads")

// Routes
router.get("/", (req, res) => {
    res.render("teste/index", {
        headTitle: "Testes - "
    })
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

router.get("/criar_pdf", (req, res, next) => {
    res.render("teste/criar_pdf", {
        layout: "layouts/pdf",
        usuarioExemplo: {
            nome: "Usuário",
            sobrenome: "Exemplo",
            idade: 10,
            estudante: true,
            comidasFavoritas: ["frutas", "lasanha"]
        }
    })
})

router.get("/imprimir_pdf", (req, res, next) => {

    let simOuNao = (entrada) => entrada === true ? "Sim" : "Não"
    
    res.render("teste/criar_pdf", {
        layout: "layouts/pdf"
    })

    let usuarioExemplo = {
        nome: "Usuário",
        sobrenome: "Exemplo",
        idade: 10,
        estudante: true,
        comidasFavoritas: ["frutas", "lasanha"]
    }

    const htmlTemplate = `
        <h1>Dados do Usuário</h1>
        <br>
        <ul>
            <li>Nome: ${usuarioExemplo.nome + " " + usuarioExemplo.sobrenome}</li>
            <li>Idade: ${usuarioExemplo.idade}</li>
            <li>É estudante? ${ simOuNao(usuarioExemplo.estudante) }</li>
            <li>Comidas Favoritas: ${usuarioExemplo.comidasFavoritas}</li>
        </ul>
    `;


    
})

router.get("/html2canvas", (req, res, next) => {
    res.render("teste/html2canvas")
})


// Upload de Imagens
router.get("/upload", (req, res, next) => {
    res.render("teste/upload_imagem")
})

router.post("/upload", upload.single('imagem'), (req, res, next) => {


    let text = req.body.texto
    let imagem = req.file
    let nomeImagem = imagem.filename

    console.log(text)
    console.log(req.file)

    const dataUpload = new TesteUpload({
        title: text,
        fullPath: path.join(__dirname, `/img/upload/user/${nomeImagem}`),
        imageName: nomeImagem
    })

    dataUpload.save().then(() => {

        res.render("teste/upload_imagem", {
            texto: text,
            imagem: nomeImagem
        })

    }).catch((err) => {

        console.log("erro ao enviar imagem: ")
        console.log(err)

        req.flash("errorMessage","Não foi possível salvar os dados")
        res.redirect("/")
    })


})

router.get("/imagem/:imgName", (req, res, next) => {
    let imageName = req.params.imgName

    TesteUpload.find({imageName: imageName}).lean().then((imagem)=>{

        console.log(imagem)
        
        if(imagem.length > 0) {
            res.render("teste/verImagem", {
                // titulo: imagem.title,
                // caminho: imagem.fullPath,
                // nomeImagem: imagem.imageName,
                // alertaPositivo: ["Imagem encontrada", "Caminho encontrado"]

                img: imagem
            })
        }else{
            res.render("teste/verImagem", {
                titulo: "Sem título",
                caminho: "Nenhum caminho",
                nomeImagem: "Nenhuma imagem",
                alertaNegativo: ["Imagem não encontrada", "Caminho não encontrado"]
            })
        }

    }).catch((err)=>{
        req.flash("errorMessage", "Nenhuma imagem encontrada")
        res.redirect("/")
    })
})


// Export
module.exports = router