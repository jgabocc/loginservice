const express = require('express');
const userController = require('./../User-Controller/user-controller') 
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.render('login')
})

router.get('/signUp', (req,res,next)=>{
    res.render('signupForm')
})

router.post('/signup', userController.createUSer)
router.patch('/signup', userController.updateOne)
router.delete('/signup', userController.deleteUser)


router.get('/users', userController.getAllUsers)

module.exports = router;