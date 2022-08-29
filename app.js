const EXPRESS = require('express');
var bodyParser = require('body-parser')
const DOTENV = require('dotenv');

const app = EXPRESS();


var variables =  require('./User-Controller/User-variables');
let configVars = variables.getVariables();
let openchrome = configVars.settings.find(e=> {return e.name === "OpenChrome"});
let url = configVars.dataSettings.find(e=> {return e.name === "URL"})
let port = configVars.dataSettings.find(e=> {return e.name === "PORT"})
let testing = configVars.settings.find(e=> {return e.name === "Testing"})
let serviceStatus = configVars.settings.find(e=> {return e.name === "Service"})


app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

const userVarRoutes = require('./routes/user-variables-routes.js')
const loginRoutes = require('./routes/login-route')


DOTENV.config({path: __dirname + '/config.env'});

const routesObject = JSON.parse(process.env.routes)

app.set('views', './views');
app.set('view engine', 'pug');

app.use(EXPRESS.static('public'));

app.use(routesObject.userVariables, userVarRoutes)
app.use('/oauth', (req,res,next)=>{

    console.log(req.body);
    res.redirect("/uservariables/config");
    next();
})

if(!JSON.parse(serviceStatus.value)){
    app.use('*', (req,res,nex)=>{
        res.render('noService')
    })
}else {
    app.use('/', loginRoutes)
}



const PORT = process.env.PORT || 3000;
//const openchrome = process.env.opencrome;



module.exports = {app: app, port:port.value, message:process.env.SERVER_MESSAGE, url:`${url.value}:${port.value}`, openChrome:JSON.parse(openchrome.value), testing:JSON.parse(testing.value), ServiceStatus:JSON.parse(serviceStatus.value)};

