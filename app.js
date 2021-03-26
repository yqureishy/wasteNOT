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


// display food bank 'about us' landing page
app.get('/foodbank', (req, res) => {
    models.Foodbank.findAll({})
    .then(foodbanks => {
        res.render('foodbank', {foodbanks:foodbanks})
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
    res.render('add-foodbank', {message: 'Location saved successfully.'})
  })


app.listen(3000,()=>{
    console.log("Server is running...")
})