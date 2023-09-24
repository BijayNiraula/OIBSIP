import { Response,NextFunction } from "express";
import Menu from "../../db/models/menu";

export const getMenuItems = async (req: any, res: Response,next:NextFunction) => {
    try {
      const menuItems= await Menu.find({});
      res.status(200).send(menuItems)
    }catch(err){ 
      next(err);
    }
  }