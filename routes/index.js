var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.user===undefined||req.session.user==='')
  res.render('index', { title: 'TVRush'});
    else
    res.redirect('/users/profile');
});

module.exports = router;
