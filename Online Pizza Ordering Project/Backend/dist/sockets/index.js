"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketIO = exports.ordersSocketEventEmitter = void 0;
const socket_io_1 = require("socket.io");
const events_1 = __importDefault(require("events"));
exports.ordersSocketEventEmitter = new events_1.default();
let liveTraffic = 0;
const setupSocketIO = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.FRONTENT_BASE_URL
        }
    });
    io.on('connection', (socket) => {
        liveTraffic++;
        console.log(" a user connected : " + socket.id, `live traffic : ${liveTraffic} `);
        io.emit("liveTraffic", liveTraffic);
        socket.on('join', (userId) => {
            socket.join(userId);
        });
        socket.on('disconnect', () => {
            console.log('a user disconnected : ' + socket.id);
            liveTraffic--;
            io.emit("liveTraffic", liveTraffic, `live traffic : ${liveTraffic} `);
        });
    });
    exports.ordersSocketEventEmitter.on("updateOrderStatus", ({ userId, _id, orderStatus }) => {
        io.to(userId).emit("updatedOrderStatus", { userId, _id, orderStatus });
    });
};
exports.setupSocketIO = setupSocketIO;
