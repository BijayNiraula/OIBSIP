"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
require("./configuration/googleAuthentication");
const express_1 = __importDefault(require("express"));
const corsMidldeware_1 = __importDefault(require("./middleware/corsMidldeware"));
const errorHandlerMiddleware_1 = require("./middleware/errorHandlerMiddleware");
const sessionMiddleware_1 = __importDefault(require("./middleware/sessionMiddleware"));
const authenticateRoutes_1 = __importDefault(require("./routes/authenticateRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const connectDb_1 = __importDefault(require("./db/connectDb"));
const passport = require("passport");
const http_1 = __importDefault(require("http"));
const sockets_1 = require("./sockets");
const PORT = process.env.port || 8000;
const app = (0, express_1.default)();
app.set("trust proxy", 1);
const server = http_1.default.createServer(app);
(0, sockets_1.setupSocketIO)(server);
app.use(sessionMiddleware_1.default);
app.use(passport.initialize());
app.use(passport.session());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(corsMidldeware_1.default);
app.use("/authenticate", authenticateRoutes_1.default);
app.use("/admin", adminRoutes_1.default);
app.use("/user", userRoutes_1.default);
app.use(errorHandlerMiddleware_1.errrorHandlerMiddleware);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connectDb_1.default)();
    server.listen(PORT, () => {
        console.log("server is running in Port : " + PORT);
    });
});
startServer();
