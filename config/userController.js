const User =require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
exports.register=(req,res)=>
{
    var users= new User(req.body);
    users.password= bcrypt.hashSync(req.body.password,10);
    users.save((err,newUsers)=>{
        if(err)
        {
            res.json({'code': false,'message':'Error to save'});
            return;
        }
        newUsers.password = undefined
        res.json({ message: 'Save ok', data: newUser });
    });
};
 
exports.login=(req,res)=>{
var username= req.body.name;
var password= req.body.password;
User.findOne({'name': username},(err,user)=>{
    if(!user){
        res.json({error: 'User is not exist'})
    }
    else if(user && user.comparePassword(password)){
        var payload= {username: user.name, usermail: user.email};
        var jwtToken = jwt.sign(payload,con)
    }
});
exports.updated=(req,res)=>
{   var usermail= req.body.user.email;
    var payload= {usermail: usermail};
    var jwtToken = jwt.sign(payload,con)
}
};