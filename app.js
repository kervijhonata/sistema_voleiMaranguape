// Configs
const express = require("express")
const app = express()
const SERVER_INFO = {
    PORT: 8081,
    HOST: "localhost"
}

app.get("/", (req, res) => {
    res.send("Olá, Mundo")
})

app.listen(SERVER_INFO.PORT, () => {
    console.log(`Server running on port ${SERVER_INFO.PORT}`)
})