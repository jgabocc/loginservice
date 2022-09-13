const path = require('path')
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const app = express();

const {googlePass , initialize} = require('./config/passport')
const User = require('./models/UserModel');
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})

require('./config/db').dbConnect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(flash());

//Serving the Public folder as static
app.use('/', express.static(path.join(__dirname, '/public'))); 

//Passport Config
googlePass(passport);
initialize(passport);

// Sessions
app.use(session({
    secret: 'MYSECRET',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Express Handlebars setup and set main as a default layout
app.engine('.hbs', exphbs.engine({extname: '.hbs', defaultLayout:'main'}));
app.set('view engine', '.hbs');
app.set('views', './views');




//Setting routes

app.use('/', require('./routes/homeroutes'));
app.use('/auth', require('./routes/authRoutes'));

module.exports = app;