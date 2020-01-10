const express =require("express");
const expresslayout= require('express-ejs-layouts');
const app =express();
const PORT= process.env.PORT||3000
const mongoose= require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);
//Config db
const db =require('./config/key').MongoURI;
mongoose.connect(db,{useNewUrlParser: true}).then(
()=>{
    console.log("MongoDB connected");
}
).catch((err)=> console.log(err));
// Passport Config

// Bodyparser
app.use(express.urlencoded({extended:false}));
//EJS
app.use(expresslayout);
app.set('view engine','ejs');
// Express session 
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);
//Express connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
// Passport middleware
app.use(passport.initialize());
app.use(passport.session()); 
//ROUTES
app.use('/',require('./routes/index'));
app.use('/user',require('./routes/user'));
app.listen(PORT, console.log(`Server started on port ${PORT}`));
