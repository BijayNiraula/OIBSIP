import { NextFunction, Request, Response } from "express";
import Orders from "../../db/models/orders"
import { ordersSocketEventEmitter } from "../../sockets";

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const results = await Orders.find({});
        res.status(200).send({ status: "success", data: results })
    } catch (err) {
        next(err)
    }
}

export const updateOrderStatus = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { _id, orderStatus, userId } = req.body;
        if (!_id && !orderStatus) throw new Error("_id and orderStatus fields are required");
        const result = await Orders.updateOne({ _id }, { orderStatus });
        if (orderStatus === "completed") {
            await Orders.deleteOne({ _id })
        }
        if (result.modifiedCount === 1) {
            ordersSocketEventEmitter.emit("updateOrderStatus", { _id, orderStatus, userId })
            res.status(200).send({ status: "success", data: result });

        } else {
            throw new Error("order status not updated")
        }
    }
    catch (err) {
        next(err)
    }
}