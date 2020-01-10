const express= require('express');
const router =express.Router();
const bcrypt = require('bcryptjs');
const User =  require('../models/User');
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');
// Login page
router.get('/login',forwardAuthenticated, (req,res)=> 
    res.render('login')
 );
router.get('/register',forwardAuthenticated,(req,res)=>{
    res.render('register');
});
router.get('/updated',(req,res)=>{
    res.render("updated",{user: req.user});
});
router.post('/register',(req,res)=>{
    const {name, email,password, password2}= req.body;
    let errors =[];
    if(!name|| !email || !password||!password2)
    {
        errors.push({msg: 'Please fill in all fields'});
    }
    if(password!=password2)
    {
        errors.push({msg: 'Passwords do not match'});
    }
    if(password.length<8)
    {
        errors.push({msg: 'Password should be at least 8 characters'});
    }
    if(errors.length>0)
    {
        res.render('register',{
            errors,
            name, 
            email,
            password,
            password2
        });
    }
    else
    {
        User.findOne({email:  email}).then((user)=>
        {
            if(user)
            {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                  errors,
                  name,
                  email,
                  password,
                  password2
                });
            }
            else
            {
            const newuser = new User({
                name,
                email,
                password,
            });
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newuser.password, salt, function(err, hash) {
                    if(err) throw err;
                    newuser.password= hash;
                    newuser.save().then((user)=>{
                    req.flash(
                            'success_msg',
                            'You are now registered and can log in'
                    );
                    res.redirect('/user/login');
                 }).catch((err)=>{
                     console.log(err);
                 });
                });
            });
            }
            
        });
        
    }
});
router.post('/login',(req,res,next )=>{
    passport.authenticate('local',{
        successRedirect: '/mainboard',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
  });
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/user/login');
}); 
 
router.post('/updated',(req,res)=>{
    const selection = req.body.Rule;
    const user =req.user;
    let success_msg=[];
    console.log(req.user);
    User.findOneAndUpdate({email: user.email}, { "scope" : selection }, function(err,doc) {
        if (err) { 
            success_msg.push({success_msg: "Error updated "+user.email});
            res.render("updated",{user,success_msg}); }
        else {   res.render('mainboard',{user: req.user});}
      });  
   
    
  
});
module.exports=router;