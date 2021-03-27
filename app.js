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

// add new restaurant user
app.post('/register', async (req, res) => {

    const emailAsUsername = req.body.emailAsUsername;
    let password = req.body.password
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

    const salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password, salt)
    
    let user = models.User.build({
        emailAsUsername: emailAsUsername,			
        password: hashedPassword,
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

// display restaurant user profile
app.get('/profile', (req, res) => {
    res.render('profile')
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