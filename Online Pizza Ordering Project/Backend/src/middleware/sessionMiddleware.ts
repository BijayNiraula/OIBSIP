const session = require("express-session");

const sessionMiddleware = session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  proxy: true,
  name: 'MyCoolWebAppCookieName12332112',
  cookie: {
    secure: false,
    httpOnly: false,
    sameSite: 'none'
  }
})

export default sessionMiddleware;