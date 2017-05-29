var mongoose=require('mongoose');
var User=mongoose.model('User');
var express = require('express');

var router = express.Router();

router.post('/new',function(req,res)
{
  if(req.xhr || req.accepts('json,html')==='json'){

          var ty=typeof(req.body);
        //  console.log(ty);
         var form_data=req.body;
         console.log(form_data['password']);
           res.send({success:true});
      } else {

      }
});
module.exports = router;

/* GET users listing.*/
/*router.get('/', function(req, res, next) {
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

});*/
