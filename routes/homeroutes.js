const router = require('express').Router();
const passport = require('passport');
const { ensureAuth, ensureGuest } = require('./../middleware/auth') 
const homeController = require('./../controller/homeController')
const authController = require('./../controller/authController')


//@Route "/"
//@Type GET Home Page
//if user is not defined, will render for guests
router.get('/', homeController.home)


//@Route "/login"
//@Type GET Login Page
// login if not user will redirect home
router.get('/login', ensureGuest, homeController.login)

//@Route "/login"
//@Type post Login
// login if not user will redirect home
router.post('/login', ensureGuest, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect : '/login',
    failureFlash: true
}))

//@Route "/register"
//@Type GET 
router.get('/register', ensureGuest, homeController.register)

router.post('/register', ensureGuest, authController.PostRegister)

module.exports = router;