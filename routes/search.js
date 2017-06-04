var mongoose = require('mongoose');
var User = mongoose.model('User');
var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var util = require('util');
const mdb= require('moviedb')('9c52a0af4fd256f7556d2b0ebd079ba8');
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
