const User = require('./../models/UserModel');
const moment = require('moment');

exports.home = async (req,res,next)=>{
    let user = req.user;
    if(user){
        const data= {
            name: user.name,
            lastname: user.lastname, 
            authorized:user.authorized, 
            picture:user.picture,
            role:user.role
        }

        if(user.role === 'admin'){
            data.users = await User.find({});
            data.isadmin = true;
            data.users.forEach(element => {
                element.date = moment(element.createdAt).format('DD/MM/YYYY HH:mm:ss')
            });
        }
        
        res.render('home',{title:`${user.name} | Home`, csslink:"homecss", user: data});

    } else {

        res.render('home',{title:`Wellcome`, csslink:"homecss"});
    }
        
    
}

exports.login = (req,res,next)=>{
    if(req.user) res.redirect('/');
    else{
        res.render('login',{title:`Login | Please Log In`, csslink: "cssLoginPage"});
    }
}


exports.register = (req,res,next)=>{
    if(req.user) res.redirect('/');
    res.render('register',{title:`Register`, csslink: "cssLoginPage"});
}