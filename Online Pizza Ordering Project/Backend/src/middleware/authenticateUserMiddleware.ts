import { Response, NextFunction } from "express"
import { userRoles } from '../utilities/enums/userRolesEnum';

const authenticateUserMiddleware = (req: any, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user.userRole === userRoles.USER) {
    next();
  } else {
    throw new Error("not authenticated as a user");
  }
}

export default authenticateUserMiddleware;