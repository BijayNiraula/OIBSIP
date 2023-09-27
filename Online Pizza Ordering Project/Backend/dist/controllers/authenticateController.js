"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.loginDetails = exports.loginFailure = void 0;
const loginFailure = (req, res) => {
    res.send("login failed");
};
exports.loginFailure = loginFailure;
const loginDetails = (req, res) => {
    if (req.isAuthenticated()) {
        res.send({
            status: "success",
            data: {
                userId: req.user.id,
                name: req.user.displayName,
                img: req.user.photos[0].value,
                email: req.user.emails[0].value,
                userRole: req.user.userRole
            }
        });
    }
    else {
        throw new Error("not authenticated");
    }
};
exports.loginDetails = loginDetails;
const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            throw new Error("Cannot able to logout");
        }
        else {
            res.send({ status: "success" });
        }
    });
};
exports.logout = logout;
