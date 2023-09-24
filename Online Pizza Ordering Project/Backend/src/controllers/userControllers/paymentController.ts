import { NextFunction, Request, Response } from "express"
import razorpayInstance from "../../configuration/razorpay"
import crypto from "crypto"
import Menu from '../../db/models/menu';
import Orders from "../../db/models/orders";
import { MenuItemInterFace } from "../../utilities/interfaces/inteface";


interface OrderItem {
    _id: string,
    pizzaQuantity: number,
    price: number,
    size: string,
    type: string
    pizzaName: string,
}

interface MenuItemsToUpdate {
    stock: number,
    _id: string
}


export const checkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ordersItems: OrderItem[] = req.body.orders;
        let amountToPay: number = 0;
        const menuItems: MenuItemInterFace[] = await Menu.find({}).select("_id stock pizzaName price ");
        ordersItems.forEach((orderItem: OrderItem) => {
            menuItems.forEach((menuItem) => {
                if (orderItem._id === menuItem._id.toString()) {
                    if (menuItem.stock >= orderItem.pizzaQuantity) {

                    } else {
                        throw new Error(`Only ${menuItem.stock} pieces of ${menuItem.pizzaName} is available now`)
                    }
                    amountToPay = amountToPay + (menuItem.price * orderItem.pizzaQuantity * 100);
                }
            })
        });
        const options = {
            amount: amountToPay,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = await razorpayInstance.orders.create(options);
        const razorKeyId = process.env.RAZOR_KEY_ID;
        res.status(200).send({ status: "success", order, razorKeyId })
    } catch (err) {
        next(err)
    }
}





export const verifyPayment = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const decodedOrdersItems = decodeURIComponent(req.query.ordersItems as string)
        const ordersItems: OrderItem[] = JSON.parse(decodedOrdersItems);
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const RAZOR_KEY_SECRECT = process.env.RAZOR_KEY_SECRECT;
        if (!RAZOR_KEY_SECRECT) throw new Error("Razor key secrect is undefined");
        const expectedSignature = crypto
            .createHmac("sha256", RAZOR_KEY_SECRECT)
            .update(body.toString())
            .digest("hex");
        if (expectedSignature === razorpay_signature) {
            const menuItems: MenuItemInterFace[] = await Menu.find({}).select("_id price stock size type pizzaName");
            let totalAmountToPaid = 0;
            let orders = ""
            let menuItemsToUpdate: MenuItemsToUpdate[] = []
            ordersItems.forEach(async (orderItem) => {
                menuItems.forEach(async (menuItem) => {
                    if (menuItem.pizzaName === orderItem.pizzaName && menuItem.size === orderItem.size && menuItem._id.toString() === orderItem._id && menuItem.type === orderItem.type && menuItem.price === orderItem.price) {
                        menuItemsToUpdate.push({ stock: menuItem.stock, _id: menuItem._id })
                        orders = orders + `  ${orderItem.pizzaName} - ${orderItem.size} - ${orderItem.type} * ${orderItem.pizzaQuantity} , `
                        totalAmountToPaid = totalAmountToPaid + (orderItem.price * orderItem.pizzaQuantity)
                    }
                })
            })
            const payment = await razorpayInstance.payments.fetch(razorpay_payment_id);
            if (totalAmountToPaid === (Number(payment.amount) / 100)) {
                const result = await Orders.create({ orderId: razorpay_order_id, orders: orders, paidAmt: totalAmountToPaid, userId: req.user.id, deliveryLocation: payment.notes.deliveryLocation, customerPhoneNumber: payment.notes.customerPhoneNumber, orderStatus: "receieved" })
                await ordersItems.forEach(async (orderItem: any, index: number) => {
                    await Menu.updateOne({ _id: orderItem._id }, { stock: (menuItemsToUpdate[index].stock - orderItem.pizzaQuantity) })
                })
                res.redirect(`${process.env.FRONTENT_BASE_URL}`)
            } else {
                throw new Error("failed to validate the payment amount with orders")
            }
        } else {
            throw new Error("failed to validate payment")
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
}

