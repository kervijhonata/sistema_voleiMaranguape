// Modules
const express = require("express")
const hbs = require("express-hbs")
// const handlebars = require("express-handlebars")
const path = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
const bcrypt = require("bcrypt")
const passport = require('passport')
const multer = require('multer') //Multer

// Helpers
const atletaLogado = require("./helpers/eAtleta")

// Server Info
const app = express()
const SERVER_INFO = {
    PORT: 8081,
    HOST: "localhost"
}

// Requires
    // Passport
    require("./config/auth")(passport)

    // Models
    require("./models/Usuario")
    const Usuario = mongoose.model("usuarios")

// Configs
    // Session
    app.use(session({
        secret: 'cursodenode',
        resave: true,
        saveUninitialized: true,
        // cookie: { maxAge: 60000 }
    }))

    // Passport
    app.use(passport.initialize())
    app.use(passport.session())

    // Flash
    app.use(flash())

    // Global Variables
    app.use((req, res, next) => {
        
        res.locals.successMessage = req.flash('successMessage')
        res.locals.errorMessage = req.flash('errorMessage')
        res.locals.teste = req.flash('teste')
        res.locals.user = req.user || null
        next()
    })
    
    // Static Paths
    app.use(express.static(path.join(__dirname, 'public')))
    
    // BodyParser
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    // Multer Middleware
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path.join(__dirname, './public/img/upload/users/'))
        },
        filename: function(req, file, cb) {
            const suffix = Date.now() + '-' + Math.round( Math.random() * 1E9 )
            cb(null, `${file.fieldname}-${suffix}.png`)
        }
    })
    
    const upload = multer({
        storage: storage
    })

    // View Engine :: Handlebars
    app.engine("hbs", hbs.express4({
        partialsDir: path.join(__dirname, '/views/partials'),
        defaultLayout: path.join(__dirname, '/views/layouts/main')
    }))
    // app.engine("handlebars", handlebars.engine({
    //     partialsDir: path.join(__dirname, '/views/partials'),
    //     defaultLayout: path.join(__dirname, '/views/layouts/main')
    // }))
    
    app.set("view engine", "hbs")
    app.set('views', path.join(__dirname + "/views"));

    // Mongoose
    mongoose.connect(`mongodb://${SERVER_INFO.HOST}/voleiMaranguape`).then(() => {
        console.log("Mongoose conectado com Sucesso!")
    }).catch((err) => {
        console.log("Erro ao conectar ao mongoose: " + err)
    })

// Helpers
const isUserAuth = require("./helpers/userAuth")

// Routes
app.get("/", (req, res, next) => {
    if(req.user) {
        
        let userName = req.user.nome.split(" ")

        res.render("index", {
            user: {
                nome: userName[0],
                sobrenome: userName[1],
                nivel_usuario: function() {
                    if(req.user.nivel_usuario == "usuario"){
                        return "user"
                    }
                    if(req.user.nivel_usuario == "atleta"){
                        return "atleta"
                    }
                    if(req.user.nivel_usuario == "admin"){
                        return "admin"
                    }
                }
            }
        })
    }else{
        res.render("index")
    }
})

app.get("/home", (req, res, next) => {
    res.render("index")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        successFlash: true,
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
})

app.get("/logout", (req, res, next) => {

    req.logout({keepSessionInfo: false}, (err) => {
        if(err) {
            return next(err)
        }

        req.flash("successMessage", "Deslogado com sucesso")
        res.redirect("/")

    })
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/register", upload.single('user_image'), (req, res) => {

    let formData = {
        name: req.body.user_name,
        birthday: req.body.user_birthday,
        gender: req.body.user_gender,
        email: req.body.user_email,
        password: req.body.user_password, // Recebe um Array com dois campos de senha [0::senha, 1::repitaSenha]
        user_image: req.file
    }
    
    console.log(formData)
    console.log(formData.password[0] == formData.password[1])

    let formErrors = []

    // Validação dos Dados
        // Nome
        if(typeof formData.name == undefined || formData.name == "" || formData.name == null || formData.name == false) {
            formErrors.push({text: "O campo nome não pode ser vazio"})
        }
        if(typeof formData.name.length < 2 || formData.name.length > 120){
            formErrors.push({text: "Insira um nome entre 2 e 120 caracteres"})
        }

        // Data de Nascimento
        if(typeof formData.birthday == undefined || formData.birthday == "" || formData.birthday == null || formData.birthday == false) {
            formErrors.push({text: "Insira uma data de nascimento"})
        }
        // if(typeof formData.birthday.length < 2 || formData.birthday.length > 120){
        //     formErrors.push({text: "Insira um NOME entre 2 e 120 caracteres"})
        // }
        
        // Gênero
        if(typeof formData.gender == undefined || formData.gender == "" || formData.gender == null || formData.gender == false) {
            formErrors.push({text: "Marque a opção de gênero na qual você se identifica"})
        }
        
        // Email
        if(typeof formData.email == undefined || formData.email == "" || formData.email == null || formData.email == false) {
            formErrors.push({text: "Insira seu email"})
        }
        if(formData.email.length < 8 || formData.email.length > 120){
            formErrors.push({text: "Insira um email entre 8 e 120 caracteres"})
        }
        
        // Senha
        if(typeof formData.password == undefined || formData.password == "" || formData.password == null || formData.password == false) {
            formErrors.push({text: "Insira sua senha"})
        }
        if(formData.password[0].length < 8 || formData.password[0].length > 30){
            formErrors.push({text: "Insira uma senha entre 8 e 30 caracteres"})
        }
        if(formData.password[0] !== formData.password[1]){
            formErrors.push({text: "As senhas estão diferentes, corrija e tente novamente"})
        }

        // Imagem
        if(typeof formData.user_image == undefined || formData.user_image == "" || formData.user_image == null || formData.user_image == false || formData.user_image.length <= 0) {
            formErrors.push({text: "Por favor, selecione uma imagem de perfil e tente novamente"})
        }

    // Erros detectados
    if(formErrors.length > 0){
        res.render("register", {
            formErrors: formErrors,
            userData: formData
        })
    }
    else{

        Usuario.findOne({email: formData.email}).lean().then((usuario) => {
            
            if(usuario) {

                formErrors.push({text: "Esta conta de email já está em uso, tente outro email!"})
                res.render("register", {
                    formErrors: formErrors,
                    userData: formData
                })

            }else{
        
                const newUser = new Usuario({
                    nome: formData.name,
                    data_nascimento: formData.birthday,
                    genero: formData.gender,
                    email: formData.email,
                    nivel_usuario: "usuario",
                    imagem_perfil: formData.user_image.filename
                })

                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(formData.password[0], salt, (error, hash) => {
                        if(error) {
                            req.flash("errorMessage", "Houve um erro ao criar sua conta de Usuário, por favor, entre em contato com o administrador do sistema")
                            res.redirect("/")
                        }else{
                            newUser.senha = hash
                            newUser.save().then(() => {
                                req.flash("successMessage", "Usuário criado com Sucesso!")
                                res.redirect("/")
                            }).catch(err => {
                                req.flash("errorMessage", "Houve um erro ao criar sua conta de Usuário, por favor, entre em contato com o administrador do sistema")
                                res.redirect("user/register")
                            }) 
                        }
                    })
                })
            }
        }).catch(err => {
            req.flash("errorMessage", "Houve um erro ao criar sua conta de Usuário, por favor, entre em contato com o administrador do sistema")
            res.redirect("/")
        })
    }
})

app.get("/panel", (req, res, next) => {
    
    if(req.user) {

        if(req.user.nivel_usuario == "usuario"){
            res.redirect("/user/panel")
        }
        if(req.user.nivel_usuario == "atleta"){
            res.redirect("/atleta/panel")
        }
        if(req.user.nivel_usuario == "admin"){
            res.redirect("/admin/panel")
        }
    }else {
        req.flash("errorMessage", "Você precisa estar logado para acessar o sistema")
        res.redirect("/")
    }

})

// External routes
const teste = require("./routes/teste")
app.use("/teste", teste)

const portal = require("./routes/portal")
app.use("/portal", portal)

const user = require("./routes/user")
app.use("/user", user)

const atleta = require("./routes/atleta")
app.use("/atleta", atleta)

// const admin = require("./routes/admin")
// app.use("/admin", admin)

const admin = require("./routes/admin")
app.use("/admin", admin)

// Server Listener
app.listen(SERVER_INFO.PORT, () => {
    console.log(`Server running on port ${SERVER_INFO.PORT}`)
})