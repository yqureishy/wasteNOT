const express = require('express')
const router = express.Router()

module.exports = router

// display wasteNOT landing page
router.get('/', (req, res) => {
    res.render('index')
})

// display login page
router.get('/login', (req, res) => {
    res.render('login')
})

// display registration page
router.get('/register', (req, res) => {
    res.render('register')
})





