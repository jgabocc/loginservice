const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User`s name it`s a mandatory field.']
    },

    lastname: {
        type: String,
        required: [true, 'User`s lastname it`s a mandatory field.']
    },

    picture : {
        type: String,
        default: 'profile.png'
    },

    authorized : {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date, 
        default: Date.now
    },

    email: {
        type: String,
        required: [true, 'User`s email it`s a mandatory field.']
    },

    password: {
        type: String,
        required: [true, 'Password it`s a mandatory field.']
    },

    confirmPassword: {
        type: String,
        required: [true, 'Password it`s a mandatory field.']
    },

    role: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    }
})

schema.pre('save',  function (next){
        this.password = bcrypt.hashSync(this.password, 10, (err, hash) =>{
         if(err) throw (err);
 
         return hash;
        });

        this.confirmPassword = '';
    next();
})

module.exports = mongoose.model('User', schema)