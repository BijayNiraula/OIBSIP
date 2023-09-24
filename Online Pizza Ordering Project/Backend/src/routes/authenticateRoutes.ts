import express from "express";
import {logout,loginDetails,loginFailure} from "../controllers/authenticateController";
const passport =require("passport")
const router=express.Router();

router.route("/google/loginDetails").post(loginDetails)
router.route("/google/loginFailure").get(loginFailure)
router.route("/google/login").get(passport.authenticate("google", {successRedirect:process.env.FRONTENT_BASE_URL,failureRedirect: "/google/loginFailure",}));
router.route("/google/logout").post(logout)



export default router;