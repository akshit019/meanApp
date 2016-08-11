//grab the things we need
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose'); //mongoose support plugin

//declare schema
var Schema = mongoose.Schema;

//create a schema
var User = new Schema({
	username: String, //by default there in Schema
	password: String, //by default there in Schema
	
	OauthId: String, //OAuth facebook authentication
	OauthToken: String, //OAuth facebook authentication
	
	firstname: {
		type: String,
		default: '' //empty by default
	},
	lastname: {
		type: String,
		default: ''
	},
	admin: {
		type: Boolean,
		default: false //when a user gets created, it admin status is false, we can create a user an admin later and give him more privileges
	}
});

User.method.getName = function() {
	return (this.firstname + ' ' + this.lastname)
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);