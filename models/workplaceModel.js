const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User`s name it`s a mandatory field.']
    },

    picture : {
        type: String,
        default: 'building.png'
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

module.exports = mongoose.model('Workplace', schema)