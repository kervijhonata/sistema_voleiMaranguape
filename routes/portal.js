// Modules
const express = require("express")
const router = express.Router()


// Routes
router.get("/", (req, res) => {
    res.render("portal/index", {
        headerTitle: "Portal - "
    })
})


// Export
module.exports = router