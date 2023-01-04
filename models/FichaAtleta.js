// Modulos
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FichaAtleta = new Schema({
    // Dados Pessoais
    nome: {
        type: String,
        required: true 
    },
    cpf: {
        type: String,
        required: true
    },
    identidade: {
        type: String,
        required: true
    },
    expedidor_identidade: {
        type: String,
        required: true
    },
    emissao_identidade: {
        type: Date,
        required: true
    },
    reservista: {
        type: String
    },
    expedidor_reservista: {
        type: String
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    naturalidade: {
        type: String,
        required: true
    },
    nacionalidade: {
        type: String,
        required: true
    },
    
    // Escolaridade
    grau_ensino: {
        type: String,
        required: true
    },
    instituicao_ensino: {
        type: String,
        required: true
    },

    // Filiação
    pai: {
        type: String,
        required: true
    },
    mae: {
        type: String,
        required: true
    },

    // Endereço
    endereco: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    },

    // Contato
    email: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    celular: {
        type: String
    },
    tipo_contato_extra: {
        type: String,
        required: true
    },
    contato_extra: {
        type: String,
        required: true
    },

    // Numeros de Registro
    numero_registro: {
        type: Number
    },
    numero_transferencia: {
        type: Number
    }
})

// Definição
mongoose.model("fichaAtletas", FichaAtleta)