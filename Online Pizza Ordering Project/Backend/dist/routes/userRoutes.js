"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menuController_1 = require("../controllers/userControllers/menuController");
const paymentController_1 = require("../controllers/userControllers/paymentController");
const orderController_1 = require("../controllers/userControllers/orderController");
const authenticateUserMiddleware_1 = __importDefault(require("../middleware/authenticateUserMiddleware"));
const router = express_1.default.Router();
// menu items routes
router.route("/menu").get(menuController_1.getMenuItems);
// payment routes
router.route("/payment/checkout").post(authenticateUserMiddleware_1.default, paymentController_1.checkout);
router.route("/payment/verifyPayment").post(authenticateUserMiddleware_1.default, paymentController_1.verifyPayment);
// orders routes
router.route("/orders").get(authenticateUserMiddleware_1.default, orderController_1.getMyOrders);
exports.default = router;
