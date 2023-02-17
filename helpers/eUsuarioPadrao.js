// Verificação de nível de usuário :: usuário padrão :: user

function usuarioPadraoLogado(req, res, next) {

    // Usuário autenticado ?
    if( req.isAuthenticated() ) {

        // É usuário padrão ?
        if( req.user.nivel_usuario == 'usuario' ) {
            next()
        }else {
            req.flash("errorMessage", "Você não tem permissão para acessar esta página")
            res.redirect("/")
        }

    }else{
        req.flash("errorMessage", "Você precisa fazer login para acessar o sistema")
        res.redirect("/")
    }
    
}

module.exports = usuarioPadraoLogado