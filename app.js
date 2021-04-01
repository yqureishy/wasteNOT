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
    saveUnitialized: false,
}))
app.use(express.static('static'))
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')
app.use(express.json())

app.use('/users', authenticateUser, userRoutes)
app.use('/', indexRouter)
app.use('/admin', authenticateAdmin, adminRoutes)

// display food bank 'about us' landing page w/restaurant "Thank You" list
 app.get('/foodbank', (req, res) => {
    models.User.findAll({})
    .then(users => {
        res.render('foodbank', {users: users})
    })
})

// display foodbank locations page
app.get('/locations', (req, res) => {
    models.Foodbank.findAll({})
    .then(foodbanks => {
        res.render('locations', {foodbanks: foodbanks})
    })
})







// display admin page to add a foodbank
app.get('/add-foodbank', (req, res) => {
    res.render('add-foodbank')
})


// add new food bank
app.post('/add-foodbank', (req, res) => {
    const name = req.body.name
    const address = req.body.address
    const city = req.body.city
    const state = req.body.state
    const zip = req.body.zip
    const phone = req.body.phone
  
    let foodbank = models.Foodbank.build({
      name: name,			
      address: address,
      city: city,
      state: state,
      zip: zip,
      phone: phone
    })
    foodbank.save()  
    res.render('add-foodbank', {message: 'Location saved successfully!'})
  })



    







// start server
app.listen(3000,()=>{
    console.log("Server is running...")
})