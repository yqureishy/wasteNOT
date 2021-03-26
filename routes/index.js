const express = require('express')
const router = express.Router()

module.exports = router

// display wasteNOT landing page
router.get('/', (req, res) => {
    res.render('index')
})

// display food bank landing page
router.get('/foodbank', (req, res) => {
    res.render('foodbank')
})