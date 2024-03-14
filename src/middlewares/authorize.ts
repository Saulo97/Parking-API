import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../interfaces/errorResponse.interface";
import { verifyToken } from "../utils/jwt.handle";

export const authorize = async ( req: Request, res: Response, next: NextFunction)=>{
    try {
        const jwtUser = req.headers.authorization || ''
        const jwt = jwtUser.split(' ').pop()
        if(!jwt){
            const errorResponse = {status: 401, error: "Session Is Not Valid"}
            return res.status(401).json(errorResponse)
        } 
        const userJWT = await verifyToken(jwt)
        if(!userJWT){
            const errorResponse = {status: 401, error: "Session Is Not Valid"}
            return res.status(401).json(errorResponse)
        } 
        req.body.user = userJWT
        next()
    } catch (error) {
        const errorResponse = {status: 401, error: "Session Is Not Valid"}
        return res.status(401).json(errorResponse)
    }
}

