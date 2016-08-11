module.exports = {
	'secretKey': '12345-67890-09876-54321', //to encrypt our token
	'mongoUrl': 'mongodb://localhost:27017/test1',
	//OAuth facebook authentication
	'facebook': {
		clientID: '559291187576323',
		clientSecret: '329a323e7b0ae4e9ed81f3ed98efebc6',
		callbackURL: 'https://localhost:3443/users/facebook/callback'
	}
}