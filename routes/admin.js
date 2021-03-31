const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const models = require('../models')

const SALT_ROUNDS = 10

// display add-admin page
router.get('/add-admin', (req, res) => {
    res.render('add-admin')
})

router.get('/login', (req,res)=>{
    res.render('admin-login')
})










module.exports = router