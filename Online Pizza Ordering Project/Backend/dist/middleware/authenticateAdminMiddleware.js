"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRolesEnum_1 = require("../utilities/enums/userRolesEnum");
const authenticateAdminMiddleware = (req, res, next) => {
    if (req.isAuthenticated() && req.user.userRole === userRolesEnum_1.userRoles.ADMIN) {
        next();
    }
    else {
        throw new Error("not authenticated as an admin");
    }
};
exports.default = authenticateAdminMiddleware;
