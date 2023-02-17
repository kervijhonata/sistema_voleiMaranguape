const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TesteUpload = new Schema({
    title: {
        type: String,
        required: true
    },
    fullPath: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    }
})

mongoose.model("testeUploads", TesteUpload)