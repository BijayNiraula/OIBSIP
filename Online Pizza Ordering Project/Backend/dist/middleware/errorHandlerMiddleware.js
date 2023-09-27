"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errrorHandlerMiddleware = void 0;
const errrorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    res.status(400).send({ status: "error", message: err.message });
};
exports.errrorHandlerMiddleware = errrorHandlerMiddleware;
