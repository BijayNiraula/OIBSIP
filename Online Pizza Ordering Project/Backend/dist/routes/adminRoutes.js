"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateAdminMiddleware_1 = __importDefault(require("../middleware/authenticateAdminMiddleware"));
const menuController_1 = require("../controllers/adminControllers/menuController");
const ordersController_1 = require("../controllers/adminControllers/ordersController");
const dashboardController_1 = require("../controllers/adminControllers/dashboardController");
const router = express_1.default.Router();
router.use(authenticateAdminMiddleware_1.default);
// menu items routes
router.route("/menu").get(menuController_1.getMenuItems)
    .post(menuController_1.addMenuItem)
    .put(menuController_1.editMenuItem)
    .delete(menuController_1.deleteMenuItem);
// order items routes
router.route("/orders").get(ordersController_1.getOrders)
    .put(ordersController_1.updateOrderStatus);
// admin dashboard routes
router.route("/changeAdminGmail").put(dashboardController_1.changeAdminGmail);
exports.default = router;
