// Verificação de nível de usuário :: atleta

function atletaLogado(req, res, next) {

    // Usuário autenticado ?
    if( req.isAuthenticated() ) {

        // É atleta ?
        if( req.user.nivel_usuario == 'atleta' ) {
            next()
        }else {
            req.flash("errorMessage", "Você não está cadastrado como atleta para acessar esta página")
            res.redirect("/")
        }

    }else{
        req.flash("errorMessage", "Você precisa fazer login para acessar o sistema")
        res.redirect("/")
    }
    
}

module.exports = atletaLogado