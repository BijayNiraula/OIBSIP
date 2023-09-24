const session=require("express-session");

const sessionMiddleware=session({
    secret:process.env.SESSION_KEY ,
    resave: false,
    saveUninitialized: false,
  
  })

  export default sessionMiddleware;