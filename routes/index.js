const express= require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
router.get('/mainboard', ensureAuthenticated, (req, res) =>
  res.render('mainboard', {
    user: req.user
  })
);
router.get('/',forwardAuthenticated,(req,res)=> {res.send("Welcome");});
module.exports= router; 