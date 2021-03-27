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

// add new restaurant user
app.post('/register', (req, res) => {

    const emailAsUsername = req.body.emailAsUsername;
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const restaurantName = req.body.restaurantName
    const restaurantStreetAddress = req.body.restaurantStreetAddress
    const address = req.body.address
    const city = req.body.city
    const state = req.body.state
    const zip = req.body.zip
    const phone = req.body.phone
    const website = req.body.website

//hash bit is broken right now...just puts passwords in DB as clear text :(
    bcrypt.genSalt(10, function (error, salt) {
        bcrypt.hash(password, salt, function (error, hash) {
            if (!error) {
                console.log(password)
                let user = models.User.build({
                    emailAsUsername: emailAsUsername,			
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    restaurantName: restaurantName,
                    restaurantStreetAddress: restaurantStreetAddress,
                    city: city,
                    state: state,
                    zip: zip,
                    phone: phone,
                    website: website
                })
                user.save()  
                res.render('login', {newUserMessage: 'New restaurant partner saved successfully!'})
            }
        })
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