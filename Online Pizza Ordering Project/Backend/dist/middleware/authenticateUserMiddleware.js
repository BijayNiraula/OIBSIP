"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRolesEnum_1 = require("../utilities/enums/userRolesEnum");
const authenticateUserMiddleware = (req, res, next) => {
    if (req.isAuthenticated() && req.user.userRole === userRolesEnum_1.userRoles.USER) {
        next();
    }
    else {
        throw new Error("not authenticated as a user");
    }
};
exports.default = authenticateUserMiddleware;
