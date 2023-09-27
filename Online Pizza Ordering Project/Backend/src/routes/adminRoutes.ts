import express from "express";
import authenticateAdminMiddleware from "../middleware/authenticateAdminMiddleware";
import { getMenuItems,editMenuItem,deleteMenuItem,addMenuItem } from "../controllers/adminControllers/menuController";
import { getOrders, updateOrderStatus } from "../controllers/adminControllers/ordersController";
import { changeAdminGmail } from "../controllers/adminControllers/dashboardController";

const router=express.Router();

router.use(authenticateAdminMiddleware);

// menu items routes
router.route("/menu").get(getMenuItems)
                          .post(addMenuItem)
                          .put(editMenuItem)
                          .delete(deleteMenuItem);
// order items routes
router.route("/orders").get(getOrders)
                           .put(updateOrderStatus);


// admin dashboard routes
router.route("/changeAdminGmail").put(changeAdminGmail);
                           

                  




export default router;