import session from "express-session";
import MongoStore from "connect-mongo";

const mongoDbURI = process.env.DB_URI;

const sessionMiddleware = session({
    secret: 'scret',
    store: MongoStore.create({ mongoUrl: mongoDbURI }),
    saveUninitialized: false,
    resave: false,
    proxy: true,
    cookie: {
        maxAge: 60 * 1000 * 60 * 24,
        secure: true
    }
});

export default sessionMiddleware;
