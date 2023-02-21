const path = require("path")
const nodeMailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")

let {host, port, auth} = require("../db/mailtrap_user.json")

const transport = nodeMailer.createTransport({
    host,
    port,
    auth: {
        user: auth.user,
        pass: auth.pass
    }
})

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.join(__dirname, '../views/resources/mail/'),
    extName: '.html'
}))

module.exports = transport