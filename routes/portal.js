// Modules
const express = require("express")
const router = express.Router()


// Routes
router.get("/", (req, res) => {
    res.render("portal/index", {
        header_title: "Portal - ",
        user: {
            name: "Kervi"
        }
    })
})


// Export
module.exports = router