module.exports = {
    session: {
		secret: "VincentChrisVuGentApp007",
		saveUninitialized: false,
		resave: true
	},
    connectionString: '',
    auth0: {
        domain:'',
        clientID:'',
        clientSecret:'',
        callbackURL:  '/auth/callback'
    }
}
