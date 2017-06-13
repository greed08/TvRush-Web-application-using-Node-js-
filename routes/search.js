var mongoose = require('mongoose');
var User = mongoose.model('User');
var Schema  = mongoose.Schema;
var ObjectId=Schema.ObjectId;
var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var util = require('util');
const mdb= require('moviedb')('9c52a0af4fd256f7556d2b0ebd079ba8');
router.post('/response',function(req,res)
{
  if (req.xhr || req.accepts('json,html') === 'json') {
    var data=req.body;
    var msg='';
    console.log('You targetted '+data.title);
    console.log('tv or movie '+data.tv_or_movie);
    console.log('your action was '+data.eve);

   console.log('session user is'+req.session.user);
   if(req.session.user===undefined)
   {
   msg='Please login first!!';

  res.json({
               success:true,
               msg:msg
             });
 }
   else {
     if(data.eve==='likes')
     {
     let title=data.title;

     let torm=data.tv_or_movie;
     let overview=data.overview;
     let img_src=data.img_src;
     console.log("Title of the liked attribute is "+title);
     console.log("You selected "+torm);
     console.log("Overview is "+overview);
     console.log("Image souce is "+img_src);
     if(torm==='Movies'){
       //console.log('You selected movies and likes');
       User.find({likeMovie:img_src},function(err,user)
     {
        if(!err)
        {
          if(user==undefined||user.length<1)
          {
          console.log('Data not present');
          let query={username:req.session.user};
          let update={$addToSet:{likeMovie:img_src}};
          let options={multi:true};

          User.update(query,update,options,callback);
          function callback(err,numaffected)
          {
            if(!err)
            {
              //console.log("Number os rows affected are "+numaffected["nRemoved"]);
               msg="You liked "+title+"!!";
             }
             else {
               util.log(err);
               msg="Errro occured";
             }
             res.json({
               success:true,
               msg:msg
             });
          }
        }
          else {
            console.log("Data already present");
            let query={username:req.session.user};
            let update={$pull:{likeMovie:img_src}};
            let options={multi:true};
            User.update(query,update,options,callback);
            function callback(err,numaffected)
            {
              if(!err)
              {
                //console.log("Number os rows affected are "+numaffected["nRemoved"]);
                 msg="You disliked "+title+"!!";
               }
               else {
                 util.log(err);
                 msg="Errro occured";
               }
               res.json({
                 success:true,
                 msg:msg
               });

          }
        }



}
});
}
}









    // msg="You liked "+data.title+"!!";



   if(data.eve==='add_to_wishlist')
      {

        msg='Added '+data.title+' to your wishlist!!';
      }
   if(data.eve==='add_to_watchlist')
      {
        msg='Added '+data.title+ ' to your watched history!!';
      }

    }











  }
});


router.get('/movies/:query',function(req,res)
{
  var query=req.params.query;
  var  search_result;
    var session_user=' ';
  if(req.session.user!==undefined||req.session.user!==' ')
session_user=req.session.user;
 if(session_user===undefined) {
     session_user=" ";
  }
  console.log('Sessiossiosiosiosiosiosiosi '+session_user);
  mdb.searchMovie({ query:query,video:true}, (err, response) => {
  search_result=response;

  res.render('movie_and_tv',{result:search_result,session_user:session_user});

});

});
router.get('/tv/:query',function(req,res)
{
  var query=req.params.query;
  var  search_result;
  var session_user=' ';
if(req.session.user!==undefined||req.session.user!==' ')
session_user=req.session.user;
if(session_user===undefined) {
   session_user=" ";
}
console.log('Sessiossiosiosiosiosiosiosi '+session_user);
  mdb.searchTv({ query:query,video:true}, (err, response) => {
  search_result=response;

  res.render('movie_and_tv',{result:search_result,session_user:session_user});

});

});

module.exports=router;
