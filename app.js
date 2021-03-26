const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const models = require('./models')
const { Op } = require('sequelize')
const router = express.Router()
const indexRouter = require('./routes/index')

app.use(express.urlencoded())
app.use(session({
    secret: "keyboard-cat",
    resave: false,
    saveUnitialized: true,
}))
app.use(express.static('static'))
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')
app.use(express.json())
app.use('/', indexRouter)








app.listen(3000,()=>{
    console.log("Server is running...")
})