// Modules
const express = require("express")
const router = express.Router()


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


// Export
module.exports = router