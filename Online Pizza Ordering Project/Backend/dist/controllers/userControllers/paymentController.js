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
exports.verifyPayment = exports.checkout = void 0;
const razorpay_1 = __importDefault(require("../../configuration/razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const menu_1 = __importDefault(require("../../db/models/menu"));
const orders_1 = __importDefault(require("../../db/models/orders"));
const checkout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersItems = req.body.orders;
        let amountToPay = 0;
        const menuItems = yield menu_1.default.find({}).select("_id stock pizzaName price ");
        ordersItems.forEach((orderItem) => {
            menuItems.forEach((menuItem) => {
                if (orderItem._id === menuItem._id.toString()) {
                    if (menuItem.stock >= orderItem.pizzaQuantity) {
                    }
                    else {
                        throw new Error(`Only ${menuItem.stock} pieces of ${menuItem.pizzaName} is available now`);
                    }
                    amountToPay = amountToPay + (menuItem.price * orderItem.pizzaQuantity * 100);
                }
            });
        });
        const options = {
            amount: amountToPay,
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = yield razorpay_1.default.orders.create(options);
        const razorKeyId = process.env.RAZOR_KEY_ID;
        res.status(200).send({ status: "success", order, razorKeyId });
    }
    catch (err) {
        next(err);
    }
});
exports.checkout = checkout;
const verifyPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const decodedOrdersItems = decodeURIComponent(req.query.ordersItems);
        const ordersItems = JSON.parse(decodedOrdersItems);
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const RAZOR_KEY_SECRECT = process.env.RAZOR_KEY_SECRECT;
        if (!RAZOR_KEY_SECRECT)
            throw new Error("Razor key secrect is undefined");
        const expectedSignature = crypto_1.default
            .createHmac("sha256", RAZOR_KEY_SECRECT)
            .update(body.toString())
            .digest("hex");
        if (expectedSignature === razorpay_signature) {
            const menuItems = yield menu_1.default.find({}).select("_id price stock size type pizzaName");
            let totalAmountToPaid = 0;
            let orders = "";
            let menuItemsToUpdate = [];
            ordersItems.forEach((orderItem) => __awaiter(void 0, void 0, void 0, function* () {
                menuItems.forEach((menuItem) => __awaiter(void 0, void 0, void 0, function* () {
                    if (menuItem.pizzaName === orderItem.pizzaName && menuItem.size === orderItem.size && menuItem._id.toString() === orderItem._id && menuItem.type === orderItem.type && menuItem.price === orderItem.price) {
                        menuItemsToUpdate.push({ stock: menuItem.stock, _id: menuItem._id });
                        orders = orders + `  ${orderItem.pizzaName} - ${orderItem.size} - ${orderItem.type} * ${orderItem.pizzaQuantity} , `;
                        totalAmountToPaid = totalAmountToPaid + (orderItem.price * orderItem.pizzaQuantity);
                    }
                }));
            }));
            const payment = yield razorpay_1.default.payments.fetch(razorpay_payment_id);
            if (totalAmountToPaid === (Number(payment.amount) / 100)) {
                const result = yield orders_1.default.create({ orderId: razorpay_order_id, orders: orders, paidAmt: totalAmountToPaid, userId: req.user.id, deliveryLocation: payment.notes.deliveryLocation, customerPhoneNumber: payment.notes.customerPhoneNumber, orderStatus: "receieved" });
                yield ordersItems.forEach((orderItem, index) => __awaiter(void 0, void 0, void 0, function* () {
                    yield menu_1.default.updateOne({ _id: orderItem._id }, { stock: (menuItemsToUpdate[index].stock - orderItem.pizzaQuantity) });
                }));
                res.redirect(`${process.env.FRONTENT_BASE_URL}`);
            }
            else {
                throw new Error("failed to validate the payment amount with orders");
            }
        }
        else {
            throw new Error("failed to validate payment");
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.verifyPayment = verifyPayment;
