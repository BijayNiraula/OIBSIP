import { NextFunction, Response } from "express";
import Menu from "../../db/models/menu";


export const getMenuItems = async (req: any, res: Response, next: NextFunction) => {
  try {
    const menuItems = await Menu.find({});
    res.status(200).send({status:"success",data:menuItems});
  } catch (err) {
    next(err);
  }
}


export const addMenuItem = async (req: any, res: Response, next: NextFunction) => {
  const { pizzaName, size, type, price, description,stock } = req.body;
  try {
    const result = await Menu.create({ pizzaName, size, type, price, description,stock });
    res.status(200).send({status:"success",data:result});
  } catch (err) {
   
    next(err);
  }
}


export const editMenuItem =  async(req: any, res: Response,next:NextFunction) => {
  const { pizzaName, size, type, price, description, _id,stock } = req.body;
  try {
    if(_id && pizzaName && size && type && price && description && stock){
    const result = await Menu.updateOne({ _id }, { pizzaName, size, type, price, description,stock });
    res.status(200).send({ status: "success"})
    }else{
      throw new Error("please provide all the fields")
    }
  } catch (err) {
    next(err)
  }
}


export const deleteMenuItem = async (req: any, res: Response, next: NextFunction) => {
  const { _id } = req.body;
  try {
    if (_id) {
      const result = await Menu.deleteOne({ _id });
      res.status(200).send({ status: "success" })
    }else{
      throw new Error("_id field should be provided")
    }
  } catch (err) {
     next(err)
  }
} 