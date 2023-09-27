"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session = require("express-session");
const sessionMiddleware = session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Allow cookies over both HTTP and HTTPS
    },
});
exports.default = sessionMiddleware;
