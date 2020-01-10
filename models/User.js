const mongoose= require("mongoose");
const UserSchema= new mongoose.Schema({
name: {
    type: String,
    required: true,
},
email:
{
    type: String,
    required: true,
},
password:
{
    type:String,
    required: true,
},
date:
{
    type: Date,
    default: Date.now,
},
scope:
{
    type:String,
    enum: ['admin', 'client'],
    default: "client",
}
});
 
const User = mongoose.model('User',UserSchema);
module.exports=User;