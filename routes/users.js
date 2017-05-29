var mongoose=require('mongoose');
var User=mongoose.model('User');
var express = require('express');

var router = express.Router();

/* GET users listing.*/
router.get('/', function(req, res, next) {
  var name='Omkar',
  email ='Omilpsablock@gmail.com';

  var newUser = new User({
  username: {name},
  email: email,
  lastLogin : Date.now()
  }).save( function( err ){
  if(!err){
  console.log('User saved!');
  }
  });
  res.send('respond with a resource');

});
exports.create=function(req,res){
  res.render('signUpForm');
};
