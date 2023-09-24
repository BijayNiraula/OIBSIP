import { NextFunction, Request, Response } from "express"


export const loginFailure = (req: Request, res: Response) => {
    res.send("login failed")

}

export const loginDetails = (req: any, res: Response) => {
    if (req.isAuthenticated()) {
        res.send({
            status: "success",
            data: {
                userId: req.user.id,
                name:req.user.displayName,
                img: req.user.photos[0].value,
                email: req.user.emails[0].value, 
                userRole:req.user.userRole
            }})
    } else {
        throw new Error("not authenticated")
    }
}

export const logout = (req: any, res: Response) => {
    req.logout((err: Error) => {
        if (err) {
            throw new Error("Cannot able to logout")
        } else {
            res.send({ status: "success" })
        }
    })
}
