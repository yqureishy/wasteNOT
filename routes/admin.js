const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const models = require('../models')

const SALT_ROUNDS = 10

// display add-admin page
router.get('/add-admin', (req, res) => {
    res.render('add-admin')
})

// add new admin user
router.post('/add-admin', async (req, res) => {

    const emailAsUsername = req.body.emailAsUsername;
    let password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    const salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password, salt)
    let registeredAdmin = await models.Admins.findOne({
        where:{
            emailAsUsername: emailAsUsername
        }
    })
    if(!registeredAdmin){
       
        let newAdmin = models.Admins.build({
            emailAsUsername: emailAsUsername,           
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        let savedAdmin = await newAdmin.save()

    if(savedAdmin != null) {
        res.render('login', {newAdminMessage: 'New admin saved successfully!' })
    }else{
        res.render('add-admin',{message:"Username already exists."})
    }

    } else{
        res.render('add-admin',{message:"Username already exists."})
    }

})







module.exports = router