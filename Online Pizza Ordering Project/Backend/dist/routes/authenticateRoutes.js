"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateController_1 = require("../controllers/authenticateController");
const passport = require("passport");
const router = express_1.default.Router();
router.route("/google/loginDetails").post(authenticateController_1.loginDetails);
router.route("/google/loginFailure").get(authenticateController_1.loginFailure);
router.route("/google/login").get(passport.authenticate("google", { successRedirect: process.env.FRONTENT_BASE_URL, failureRedirect: "/google/loginFailure", }));
router.route("/google/logout").post(authenticateController_1.logout);
exports.default = router;
