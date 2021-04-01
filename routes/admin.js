const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const models = require('../models')

const SALT_ROUNDS = 10

// display add-admin page
router.get('/add-admin', (req, res) => {
    res.render('add-admin')
})

// router.get('/all-donations', (req, res) => {
//     res.render('all-donations')
// })


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
        res.render('admin-login', {newAdminMessage: 'New admin saved successfully!' })
    }else{
        res.render('add-admin',{message:"Username already exists."})
    }

    } else{
        res.render('add-admin',{message:"Username already exists."})
    }

})

// display admin page to see all donations
router.get('/all-donations', (req, res) => {   
    // res.render('all-donations')
    models.FoodDonation.findAll({
        include:[
        {
            model: models.User,
            as: 'user'
        }
    ]
})
    .then(donations => {
        res.render('all-donations', {donations: donations})
    })
})


// delete a donation
router.post('/delete-donation', (req, res) => {

    const donationId = req.body.donationId

    models.FoodDonation.destroy({
        where: {
            id: donationId
        }
    }).then(deletedFoodDonation => {
        res.redirect('/all-donations')
    })
})




module.exports = router