var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, function(req, res, next) {
  
	if(req.decoded){
		User.find({}, function(err, user){
			if(err) throw err;
			res.json(user);
		});
	}
	else{
		var err = new Error('You are not authorized for this task');
		return next(err);
	}

});

//registering a user
router.post('/register', function(req, res){
	User.register(new User({ username: req.body.username }), req.body.password, function(err, user){
		if(err) {
			return res.status(500).json({err: err});
		}

		//saving users firstname and lastname
		if(req.body.firstname){
			user.firstname = req.body.firstname;
		}
		if(req.body.lastname){
			user.lastname = req.body.lastname;
		}

		user.save(function(err, user) {
			passport.authenticate('local')(req, res, function(){

				// send mail on registration
				// ===================================================

				var api_key = 'key-c40b61eefbf3f79297fa7ceb459228ba';
				var domain = 'sandbox77e497343a4d42e295cd30d85908a143.mailgun.org';
				var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
				 
				var data = {
				  from: 'noreply<noreply@meanapp.com>',
				  to: req.body.username,
				  subject: 'Registration Successful',
				  text: 'Testing some Mailgun awesomness!'
				};
				 
				mailgun.messages().send(data, function (error, body) {
				  console.log(body);
				});


				//console.log("Hi there" + req.body.username);
				return res.status(200).json({status: 'Registration Successful'});
			});
		});
	});
});


//login of an existing user
router.post('/login', function(req, res, next){
	passport.authenticate('local', function(err, user, info){
		if(err){
			return next(err);
		}

		if(!user){
			return res.status(401).json({
				err: info
			});
		}

		req.logIn(user, function(err){
			if(err){
				return res.status(500).json({
					err: 'Could not log in the user' 
				});
			}

			console.log('User in users: ', user);

			var token = Verify.getToken({"username": user.name, "_id": user._id, "admin": user.admin});

			res.status(200).json({
				status: 'Login Successful',
				success: true,
				token: token
			});
		});
	})(req, res, next);
});


//logout the user
router.get('/logout', function(req, res){
	req.logout();
	res.status(200).json({
		status: 'Bye'
	});
});


//facebook authentication
router.get('/facebook', passport.authenticate('facebook'),
  function(req, res){});


router.get('/facebook/callback', function(req,res,next){
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
              var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});





module.exports = router;
