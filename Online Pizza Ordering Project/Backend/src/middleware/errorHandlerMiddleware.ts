import { Request,Response,NextFunction } from "express";

export const errrorHandlerMiddleware=(err:Error,req:Request,res:Response,next:NextFunction)=>{
  res.status(400).send({status:"error",message:err.message});
}