var mongoose=require('mongoose');
var User=mongoose.model('User');
var express = require('express');
var bcrypt=require('bcrypt-nodejs');
var router = express.Router();
var util=require('util');
router.post('/login',function(req,res)
{
  if(req.xhr || req.accepts('json,html')==='json'){
    var form_data=req.body;
    var user=form_data['username'];
    var pass=form_data['password'];
    console.log(user);
    res.send({success:true})

  }
});
router.post('/new',function(req,res)
{
  if(req.xhr || req.accepts('json,html')==='json'){

        //var ty=typeof(req.body);
        //  console.log(ty);
         var form_data=req.body;
         var username=form_data['username'];
         var email=form_data['email'];
         var password=bcrypt.hashSync(form_data['password']);
         console.log(password);
         console.log(username);
        var new_user=new User();
        new_user.email=email;
        new_user.username=username;
        new_user.password=password;
        new_user.save(function(err,savedUser)
      {
        var message='';
        var retSattus='';
      /*  if(err)
        {

        /*  console.log(err);
          res.status(500).send({success:false});
        } */
        if(!err) {
           util.log('Successfully created a new user with username :'+username);
           message='Successfully registered,You will be redirected to profile page';
           retStatus='success';
          // req.session.username=savedUser;






        /*  req.session.user=email;

          res.send({success:true});*/
        }
        else {
          util.log('Error while creating user : ' + username + ' error : ' + util.inspect(err));
          if(err.code===11000)
          {
            message="User already exists";
          }
          retStatus="failure";
        }
        res.json({
          'retStatus':retStatus,
          'message':message
        });

      });



      }
      else {

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
