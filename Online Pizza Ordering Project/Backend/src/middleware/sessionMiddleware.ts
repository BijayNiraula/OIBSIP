import session from "express-session";
import MongoStore from "connect-mongo";

const mongoDbURI = process.env.DB_URI;

const sessionMiddleware = session({
    secret: process.env.SESSION_KEY as string,
    store: MongoStore.create({ mongoUrl: mongoDbURI }),
    saveUninitialized: false,
    resave: false,
    proxy: true,
    cookie: {
        maxAge: 60 * 1000 * 60 * 24,
        secure: true,     // remove this line for local server
        sameSite: 'none', // remove this line for local server
        httpOnly: true
    }
});

export default sessionMiddleware;
