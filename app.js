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
const authenticate = require('./middlewares/authenticate')


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
app.use('/', indexRouter)
app.use('/users', authenticate, userRoutes)

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
app.get('/add-foodbank', authenticate, (req, res) => {
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






// add new food donation to DB
app.post('/donation', (req, res) => {
    const itemName = req.body.itemName
    const estimatedQty = parseInt(req.body.estimatedQty)
    const estimatedExpiration = req.body.estimatedExpiration
    const isReadyToEat = req.body.isReadyToEat
    const storageTemp = req.body.storageTemp
  
    let foodDonation = models.FoodDonation.build({
        itemName: itemName,			
        estimatedQty: estimatedQty,
        estimatedExpiration: estimatedExpiration,
        isReadyToEat: isReadyToEat,
        storageTemp: storageTemp,
    })
    foodDonation.save()  
    res.render('profile', {message: 'Thank you for your donation! One of our volunteers will arrive shortly to pick it up.'})
})

// start server
app.listen(3000,()=>{
    console.log("Server is running...")
})