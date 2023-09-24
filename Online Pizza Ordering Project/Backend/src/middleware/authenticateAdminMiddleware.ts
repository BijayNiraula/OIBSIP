import { Request,Response,NextFunction } from "express"
import { userRoles } from "../utilities/enums/userRolesEnum";
const authenticateAdminMiddleware=(req:any,res:Response,next:NextFunction)=>{
  if(req.isAuthenticated() && req.user.userRole ===userRoles.ADMIN){
        next();
     }else{
       throw new Error("not authenticated as an admin");
     }
}
export default authenticateAdminMiddleware