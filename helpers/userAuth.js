// Verificação de Autenticidade de Usuário

function isUserAuth(req, res, next) {
    if( req.isAuthenticated() ) {
        next()
    }else{
        req.flash("errorMessage", "Você precisa fazer login para acessar o sistema")
        res.redirect("/")
    }
}

module.exports = isUserAuth