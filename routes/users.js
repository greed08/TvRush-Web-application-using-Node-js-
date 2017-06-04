var mongoose = require('mongoose');
var User = mongoose.model('User');
var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var util = require('util');
router.get('/profile', function(req, res) {

    if (req.session.user === undefined || req.session.usr === '')
        res.redirect('/');
    else if (req.session.user !== ''||req.session.user!== undefined) {
        console.log('sjhgsdjahghjsedg'+req.params.user);
        res.render('user_profile', {
            session_user: req.session.user
        });
        console.log('Session user is ' + req.session.user);
    }
});
router.get('/logout', function(req, res) {
    delete req.session.user;
    req.flash('msg', 'You are successfully logging out');
    res.redirect('/');
});
router.post('/login', function(req, res) {
    var sess = req.session;

    if (req.xhr || req.accepts('json,html') === 'json') {
        var form_data = req.body;
        var user = form_data['username'];
        var pass = form_data['password'];
        //console.log(pass);
        //res.send({success:true})
        var ses_user = '';
        var msg = '';
        var success = false;
        User.findOne({
            'username': user
        }, function(error, user) {

            if (error)
                util.log(error);
            if (user) {
                if (bcrypt.compareSync(pass, user.password) == true) {
                    util.log(user.email);

                    ses_user = req.session.user = user.username;

                    msg = 'You exist in our database, ' + ses_user + ' You will be redirected to profile page';
                    util.log('Session user is ' + ses_user);

                    success = true;

                } else {

                    msg = 'Wrong Password';
                    success = false;
                    ses_user = '';

                }
                res.json({
                    message: msg,
                    success: success,
                    session_user: ses_user
                });

            } else if (!user) {
                msg = 'You do not exist in our database';
                success = true;
                ses_user = '';
                res.json({
                    message: msg,
                    success: success,
                    session_user: ses_user
                });

            }


        });



    }
});


router.post('/new', function(req, res) {
    if (req.xhr || req.accepts('json,html') === 'json') {

        //var ty=typeof(req.body);
        //  console.log(ty);
        var form_data = req.body;
        var username = form_data['username'];
        var email = form_data['email'];
        var password = bcrypt.hashSync(form_data['password']);
        console.log(password);
        console.log(username);
        var new_user = new User();
        new_user.email = email;
        new_user.username = username;
        new_user.password = password;
        new_user.save(function(err, savedUser) {
            var message = '';
            var retSattus = '';
            var session_user = '';
            var error_code = '';
            /*  if(err)
              {

              /*  console.log(err);
                res.status(500).send({success:false});
              } */
            if (!err) {
                util.log('Successfully created a new user with username :' + username);
                message = 'Successfully registered,You will be redirected to profile page';
                retStatus = true;
                req.session.user = savedUser.username;

                console.log('Session create ' + req.session.user);


                res.json({
                    'retStatus': retStatus,
                    'message': message,
                    'session_user': req.session.user,
                    'error_code': null
                });

                /*  req.session.user=email;

                  res.send({success:true});*/
            } else {
                util.log('Error while creating user : ' + username + ' error : ' + util.inspect(err));
                if (err.code === 11000) {
                    message = "User already exists";
                    retStatus = false;
                    error_code = err;
                    /* res.json({
            'retStatus':retStatus,
            'message':message,
            'session_user':req.session.user,
            'error_code':error_code
          });*/
                } else {
                    message = "Error occured!!";
                    retStatus = false;
                    error_code = util.inspect(err);
                    /*  res.json({
            'retStatus':retStatus,
            'message':message,
            'session_user':req.session.user,
            'error_code':error_code
          });*/
                }
                res.json({
                    'retStatus': retStatus,
                    'message': message,
                    'session_user': req.session.user,
                    'error_code': error_code
                });

            }




        });




    } else {

    }
});
module.exports = router;
