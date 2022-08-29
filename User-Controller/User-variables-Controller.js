
const userVar = require('./User-variables.js')
const User = require("./../models/user-model");

let variables = userVar.getVariables();
module.exports.getUserVars = (req,res,next)=>{
    
    res.json({
        "variables": variables
    })

}

module.exports.postModifyVariables = (req,res,next)=>{

    let body = req.body;

    let settings = body.settings;
    let dataSettings= body.dataSettings;
    console.log(req.body);
    if(settings.length === variables.settings.length && variables.dataSettings.length === dataSettings.length) {
        variables.settings = settings
        variables.dataSettings= dataSettings
        userVar.saveVariables(JSON.stringify(variables))
        
        res.status(201).json({
            "status":"success",
            "data": variables
        })
    }
    else{
        res.status(400).json({
            "status":"bad Request",
            "message":"the amount of data saved should be equal that were at the begining"
        })
    }
}

module.exports.configUI = async (req,res,next)=>{

    const doc = await User.find()

    let document = 
    {
        roles: variables.dataSettings.find(e=> e.name == 'roles').value,
        users:doc
    }
    res.render("config", document);
}