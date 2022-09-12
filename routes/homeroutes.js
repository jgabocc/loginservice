const router = require('express').Router();
const homeController = require('./../controller/homeController')

//@Route "/"
//@Type GET Home Page
//if user is not defined, will render for guests
router.get('/', homeController.home)


//@Route "/login"
//@Type GET Login Page
// login if not user will redirect home
router.get('/login', homeController.login)

module.exports = router;