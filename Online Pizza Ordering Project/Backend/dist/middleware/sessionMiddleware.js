"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session = require("express-session");
const sessionMiddleware = session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    name: 'session3749912qw',
    cookie: {
        secure: false,
        httpOnly: false,
        sameSite: 'none'
    }
});
exports.default = sessionMiddleware;
