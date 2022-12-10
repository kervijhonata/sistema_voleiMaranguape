// Modules
const express = require("express")
const router = express.Router()


// Routes
router.get("/", (req, res) => {
    res.send("Index of User")
})


// Router Export
module.exports = router