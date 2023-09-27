const session=require("express-session");

const sessionMiddleware=session({
    secret:process.env.SESSION_KEY ,
    resave: false,
    saveUninitialized: true,
    proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
    name: 'MyCoolWebAppCookieName12332112', // This needs to be unique per-host.
    cookie: {
      secure: true, // required for cookies to work on HTTPS
      httpOnly: false,
      sameSite: 'none'
    }
  })

  export default sessionMiddleware;