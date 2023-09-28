"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const mongoDbURI = process.env.DB_URI;
const sessionMiddleware = (0, express_session_1.default)({
    secret: 'scret',
    store: connect_mongo_1.default.create({ mongoUrl: mongoDbURI }),
    saveUninitialized: false,
    resave: false,
    proxy: true,
    cookie: {
        maxAge: 60 * 1000 * 60 * 24,
        secure: true
    }
});
exports.default = sessionMiddleware;
