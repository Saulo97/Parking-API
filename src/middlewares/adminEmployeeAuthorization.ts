import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../interfaces/errorResponse.interface";
import { Roles } from "../interfaces/user.interface";

export const isAdminOrEmployee = async ( req: Request, res: Response, next: NextFunction)=>{
    try {
        const {rol} = req.body.user
        if(rol !== Roles.admin && rol !== Roles.employee){
            const errorResponse : ErrorResponse = {status: 401, message: "This User has not permission"}
            return res.status(401).json(errorResponse)  
        }
        next()
    } catch (error) {
        const errorResponse : ErrorResponse = {status: 401, message: "This User has not permission"}
        return res.status(401).json(errorResponse)
    }
}