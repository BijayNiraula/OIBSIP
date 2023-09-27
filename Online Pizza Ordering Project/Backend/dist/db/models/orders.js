"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderItemSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    orders: {
        type: String,
        required: true
    },
    paidAmt: {
        type: Number,
        required: true
    },
    deliveryLocation: {
        type: String,
        required: true
    },
    customerPhoneNumber: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        default: Date.now()
    }
});
const Orders = mongoose_1.default.model("Orders", OrderItemSchema);
exports.default = Orders;
