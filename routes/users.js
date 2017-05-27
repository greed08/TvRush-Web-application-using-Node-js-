var mongoose=require('mongoose');
var User=mongoose.model('User');
var express = require('express');

var router = express.Router();










/* GET users listing.*/
router.get('/', function(req, res, next) {
  var use=new User({username:'greedddd'});
  res.send('respond with a resource');
  console.log(use.username);
});

module.exports = router;
