var mongoose = require('mongoose');
var User = mongoose.model('User');
var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var util = require('util');
const mdb= require('moviedb')('9c52a0af4fd256f7556d2b0ebd079ba8');
router.get('/:query',function(req,res)
{
  var query=req.params.query;
  var  search_result;
  mdb.searchMovie({ query:query}, (err, response) => {
  search_result=response;

  res.render('movie_and_tv',{result:search_result});

});
 
});

module.exports=router;