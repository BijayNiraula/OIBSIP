const session=require("express-session");

const sessionMiddleware=session({
    secret:process.env.SESSION_KEY ,
    resave: false,
    saveUninitialized: true,
    proxy: true, 
    name: 'session3749912qw', 
    cookie: {
      secure: false, 
      httpOnly: true,
      sameSite: 'none'
    }
  })

  export default sessionMiddleware;