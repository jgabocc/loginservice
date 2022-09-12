exports.home = (req,res,next)=>{
    let user = req.user;
    if(user){
    const data= {name: user.name, lastname: user.lastname, authorized:user.authorized, picture:user.picture.slice(0, -1)}
    res.render('home',{title:`${user.name} | Home`, csslink:"homecss", user: data});
    } else {

        res.render('home',{title:`Wellcome`, csslink:"homecss"});
    }
        
    
}

exports.login = (req,res,next)=>{
    if(req.user) res.redirect('/');
    res.render('login',{title:`Login | Pleas Log In`, csslink: "cssLoginPage"});
}