const passport = require('passport');
const express = require('express');
const { ensureAuth, ensureGuest } = require('./../middleware/auth') 
const authController = require('./../controller/authController');
const router = express.Router();
// @desc Auth with google
// @route Get /auth.google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))

// @desc Google auth callback
// @route GET /auth/google.callback
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect : '/',
    }), (req, res)=>{
        res.redirect('/');
    })

// @desc Logout user
// @route get /logout
router.get('/logout', ensureAuth , (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
    res.redirect('/');
    });
})




router.post('/register', ensureGuest, authController.PostRegister)

module.exports = router;