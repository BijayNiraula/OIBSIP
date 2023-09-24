import { NextFunction,Response } from "express";
import Orders from "../../db/models/orders";

export const getMyOrders=async(req:any,res:Response,next:NextFunction)=>{
    try{
        const userId=req.user.id;
        if(!userId) throw new Error("userId fields is required")
        const result=await Orders.find({userId});
        res.status(200).send({status:"success",data:result})
    }catch(err){
          next(err)
    }
}