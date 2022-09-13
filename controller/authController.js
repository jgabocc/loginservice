const User = require('../models/UserModel');

exports.PostRegister = async (req,res,next)=>{
    try{

        let user = await User.findOne({email: req.body.email});
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

        if(user.password !== user.confirmPassword) {
            res.status(401).json({
                    status:'success',
                    message: 'passwords do not match.',
                })
        } else if(user.password === '' ) {
                res.status(401).json({
                    status:'success',
                    message: 'passwords is empty.',
                })
        } else {
                let doc = await User.create(user);
                doc.password = undefined;
                doc.confirmPassword = undefined;
                doc.__v = undefined;
                if(req.url === '/register'){
                    res.redirect('/login');    
                }else{
                    res.status(201).json({
                        status:'success',
                        message: 'User created.',
                        data: doc,
                    });
                }
            }



        }
    } catch(ex){
        res.status(500).json({
            status:'success',
            message: 'Error.',
            data: ex,
        });

    }
}