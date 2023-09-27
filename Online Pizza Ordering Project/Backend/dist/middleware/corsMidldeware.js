"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require('cors');
const corsOptions = {
    origin: [process.env.FRONTENT_BASE_URL, "https://razorpay.com/"],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
};
const corsMiddleware = cors(corsOptions);
exports.default = corsMiddleware;
