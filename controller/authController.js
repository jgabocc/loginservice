const User = require('../models/UserModel');

exports.PostRegister = async (req,res,next)=>{
    try{

        let user = await User.findOne({emal: req.body.email});
        if (user) {
            res.status(200).json({
                status:'failed',
                message: 'User already Exists.'
            });
        } else {
            user =  {   
                name:  req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
            }

            let doc = await User.create(user);

            res.status(201).json({
                status:'success',
                message: 'User created.',
                data: doc,
            });

        }
    } catch(ex){
        res.status(500).json({
            status:'success',
            message: 'Error.',
            data: ex,
        });

    }
}