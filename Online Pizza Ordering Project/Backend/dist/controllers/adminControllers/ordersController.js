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
exports.updateOrderStatus = exports.getOrders = void 0;
const orders_1 = __importDefault(require("../../db/models/orders"));
const sockets_1 = require("../../sockets");
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield orders_1.default.find({});
        res.status(200).send({ status: "success", data: results });
    }
    catch (err) {
        next(err);
    }
});
exports.getOrders = getOrders;
const updateOrderStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, orderStatus, userId } = req.body;
        if (!_id && !orderStatus)
            throw new Error("_id and orderStatus fields are required");
        const result = yield orders_1.default.updateOne({ _id }, { orderStatus });
        if (orderStatus === "completed") {
            yield orders_1.default.deleteOne({ _id });
        }
        if (result.modifiedCount === 1) {
            sockets_1.ordersSocketEventEmitter.emit("updateOrderStatus", { _id, orderStatus, userId });
            res.status(200).send({ status: "success", data: result });
        }
        else {
            throw new Error("order status not updated");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.updateOrderStatus = updateOrderStatus;
