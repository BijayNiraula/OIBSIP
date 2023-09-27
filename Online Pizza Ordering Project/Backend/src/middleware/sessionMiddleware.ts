import session from 'express-session';


const sessionMiddleware = session({
    secret: process.env.SESSION_KEY as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 10,
    },
});

export default sessionMiddleware;
