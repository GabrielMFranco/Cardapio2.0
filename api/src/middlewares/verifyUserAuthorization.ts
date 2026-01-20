import { Request, Response, NextFunction } from "express";

export function verifyUserAuthorization(roleVerify: string[]){
    return(req: Request, res: Response, next: NextFunction) => {
        const { role } = req.user

        if(!roleVerify.includes(role)){
            return res.status(401).json({ message: "Não autorizado" })
        }

        return next()
    }
}