"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: [process.env.FRONTENT_BASE_URL, "https://razorpay.com/"],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
};
const corsMiddleware = (0, cors_1.default)(corsOptions);
exports.default = corsMiddleware;
