const session=require("express-session");

const sessionMiddleware=session({
    secret:process.env.SESSION_KEY ,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Allow cookies over both HTTP and HTTPS
    },
  
  })

  export default sessionMiddleware;