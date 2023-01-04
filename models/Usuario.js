// Modules
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// User Schema
const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    data_nascimento: {
        type: Date,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    nivel_usuario: {
        type: String,
        default: "usuario" // "[usuario, atleta, admin]"
    }
})

// Definition
mongoose.model("usuarios", Usuario)