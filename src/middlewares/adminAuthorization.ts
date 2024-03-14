import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../interfaces/errorResponse.interface";
import { Roles } from "../interfaces/user.interface";

export const adminAuthorization = async ( req: Request, res: Response, next: NextFunction)=>{
    try {
        const {rol} = req.body.user
        if(rol !== Roles.admin){
            const errorResponse = {status: 401, error: "This User has not permission"}
            return res.status(401).json(errorResponse)  
        }
        next()
    } catch (error) {
        const errorResponse = {status: 401, error: "This User has not permission"}
        return res.status(401).json(errorResponse)
    }
}