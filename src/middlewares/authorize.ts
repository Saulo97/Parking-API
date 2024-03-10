import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../interfaces/errorResponse.interface";
import { verifyToken } from "../utils/jwt.handle";

export const authorize = async ( req: Request, res: Response, next: NextFunction)=>{
    try {
        const jwtUser = req.headers.authorization || ''
        const jwt = jwtUser.split(' ').pop()
        if(!jwt){
            const errorResponse : ErrorResponse = {status: 401, message: "Session Is Not Valid"}
            return res.status(401).json(errorResponse)
        } 
        const userJWT = await verifyToken(jwt)
        if(!userJWT){
            const errorResponse : ErrorResponse = {status: 401, message: "Session Is Not Valid"}
            return res.status(401).json(errorResponse)
        } 
        req.body.user = userJWT
        next()
    } catch (error) {
        const errorResponse : ErrorResponse = {status: 401, message: "Session Is Not Valid"}
        return res.status(401).json(errorResponse)
    }
}

