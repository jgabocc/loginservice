const GoogleStrategy = require('passport-google-oauth20').Strategy;
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./../models/UserModel');

exports.googlePass = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async(accesToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            name : profile.name.givenName,
            lastname : profile.name.familyName,
            picture : profile.photos[0].value,
        }

        
        try{
            
            let user = await User.findOne({ googleId : newUser.googleId})
            if (user) done(null, user);
            else{            
                user = await User.create(newUser);
                done(null, user);
            } 
        }
        catch(e){
                console.log(e);
        }
    }))

    passport.serializeUser((user, done) => {done(null, user.id)});
    passport.deserializeUser((id, done) => { User.findById(id, (err, user) => done(err, user)) })
}

exports.initialize = (passport, getUserBYEmail)=>{
    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) =>{
        const user = await User.findOne({email: email});
        if (user == null){
            return done(null, false, {message: 'no user with that email.'});
        }
            
        try{
            if (await bcrypt.compareSync(password, user.password)){
                return done(null, user)
            }
            else{
                return done(null, false, {message: 'Incorrect Password'})
            }
        }
        catch(e){
            return done(e);
        }
    }));

    passport.serializeUser((user, done) => {done(null, user._id)});
    passport.deserializeUser((id, done) => { User.findById(_id, (err, user) => done(err, user)) })
}