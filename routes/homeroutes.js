const router = require('express').Router();
const passport = require('passport');
const { ensureAuth, ensureGuest } = require('./../middleware/auth') 
const homeController = require('./../controller/homeController')

//@Route "/"
//@Type GET Home Page
//if user is not defined, will render for guests
router.get('/', homeController.home)


//@Route "/login"
//@Type GET Login Page
// login if not user will redirect home
router.get('/login', homeController.login)

router.post('/testing', (req,res,next)=>{
    console.log(req.body);
})

router.post('/login', ensureGuest, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect : '/login',
    failureFlash: true
}))

module.exports = router;