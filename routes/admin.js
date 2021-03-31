const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const models = require('../models')

const SALT_ROUNDS = 10

// display add-admin page
router.get('/add-admin', (req, res) => {
    res.render('add-admin')
})

router.get('/all-donations', (req, res) => {
    res.render('all-donations')
})

router.get('/login', (req,res)=>{
    res.render('admin-login')
})

router.post('/login', async (req, res) => {

    let emailAsUsername = req.body.emailAsUsername
    let password = req.body.password

    let admin = await models.Admins.findOne( {
        where: {
            emailAsUsername: emailAsUsername
        }
    }) 
    console.log(admin)
    if (admin != null) {
        bcrypt.compare(password, admin.password, (error, result) => {

            if(result) {

                //create a session
                if(req.session) {
                    req.session.admin = {adminId: admin.id}
                    res.redirect('/all-donations')
                }
                
            } else {
                console.log('not working')
                res.render('admin-login', {message: 'Incorrect email or password'})
            }
        })
    } else {
        console.log('admin-is-null')
        res.render('admin-login', {message: 'Incorrect email or password'})
        

    }
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
        res.render('admin-login', {newAdminMessage: 'New admin saved successfully!' })
    }else{
        res.render('add-admin',{message:"Username already exists."})
    }

    } else{
        res.render('add-admin',{message:"Username already exists."})
    }

})







module.exports = router