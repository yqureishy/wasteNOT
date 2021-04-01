const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const models = require('./models')
const { Op } = require('sequelize')
const router = express.Router()
const indexRouter = require('./routes/index')
const userRoutes = require('./routes/users')
const adminRoutes = require('./routes/admin')
const authenticateAdmin = require('./middlewares/authenticateAdmin')
const authenticateUser = require('./middlewares/authenticateUser')


app.use(express.urlencoded())
app.use(session({
    secret: "keyboard-cat",
    resave: true,
    saveUninitialized: false,
}))
app.use(express.static('static'))
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')
app.use(express.json())

app.use('/users', authenticateUser, userRoutes)
app.use('/', indexRouter)
app.use('/admin', authenticateAdmin, adminRoutes)


// start server
app.listen(3000,()=>{
    console.log("Server is running...")
})