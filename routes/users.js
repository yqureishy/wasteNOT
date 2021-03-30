const express = require('express')
const router = express.Router()
const models = require('../models')



// display restaurant user profile
router.get('/profile', (req, res) => {
    res.render('profile')
})

router.get('/donation', (req, res) => {
    res.render('users/donation')
})
// add new food donation to DB
router.post('/donation', async (req, res) => {
    const itemName = req.body.itemName
    const estimatedQty = parseInt(req.body.estimatedQty)
    const estimatedExpiration = req.body.estimatedExpiration
    const isReadyToEat = req.body.isReadyToEat
    const storageTemp = req.body.storageTemp
    const userId = req.session.user.userId
  
    let foodDonation = models.Fooddonation.build({
        itemName: itemName,			
        estimatedQty: estimatedQty,
        estimatedExpiration: estimatedExpiration,
        isReadyToEat: isReadyToEat,
        storageTemp: storageTemp,
        userId: userId
    })
    
    let persistedProduct = await foodDonation.save()  
    if(persistedProduct != null) {
        res.redirect('/users/profile')

    }else {
    res.render('users/profile', {message: 'Thank you for your donation! One of our volunteers will arrive shortly to pick it up.'})
    }
})
module.exports = router