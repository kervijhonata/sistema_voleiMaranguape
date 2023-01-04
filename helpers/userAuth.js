// Verificação de Autenticidade de Usuário

function isUserAuth(req, res, next) {
    if( req.isAuthenticated() ) {
        next()
    }else{
        req.flash("errorMessage", "Você precisa estar logado para acessar o sistema")
        res.redirect("/")
    }
}

module.exports = isUserAuth