const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret:process.env.GOOGLE_CLIENT_SECRECT,
			callbackURL: `${process.env.BACKEND_BASE_URL}/authenticate/google/login`,
			scope: ["profile", "email"],
		},
		function (accessToken:string, refreshToken:string, profile:any, callback:any) {
            if(process.env.ADMIN_GMAIL===profile.emails[0].value){
				profile.userRole="admin"
			}else{
				profile.userRole="user"
			}
			callback(null, profile);
		}
	)
);

passport.serializeUser((user:string, done:any) => {
	done(null, user);
});

passport.deserializeUser((user:string, done:any) => {
	done(null, user);
});