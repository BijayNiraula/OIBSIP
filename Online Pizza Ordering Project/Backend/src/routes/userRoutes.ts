import express from "express";
import { getMenuItems } from "../controllers/userControllers/menuController";
import { checkout, verifyPayment } from "../controllers/userControllers/paymentController";
import { getMyOrders } from "../controllers/userControllers/orderController";
import authenticateUserMiddleware from "../middleware/authenticateUserMiddleware";
const router=express.Router();

// menu items routes
router.route("/menu").get(getMenuItems);

// payment routes
router.route("/payment/checkout").post( authenticateUserMiddleware,checkout);
router.route("/payment/verifyPayment").post(authenticateUserMiddleware,verifyPayment);
  
// orders routes
router.route("/orders").get(authenticateUserMiddleware,getMyOrders);



export default router;