const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    googleId:{
        type: String,
        required: [true, 'Google Id its mandatory.']
    },

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
    }
})

module.exports = mongoose.model('User', schema)