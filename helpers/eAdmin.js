function adminLogado(req, res, next) {
    
    if( req.isAuthenticated() ) {

        // É atleta ?
        if( req.user.nivel_usuario == 'admin' ) {
            next()
        }else {
            req.flash("errorMessage", "Você não possui permissões de administrador")
            res.redirect("/")
        }

    }else{
        req.flash("errorMessage", "Você precisa fazer login para acessar o sistema")
        res.redirect("/")
    }
}

module.exports = adminLogado