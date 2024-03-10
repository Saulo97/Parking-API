import {  sign, verify } from "jsonwebtoken"
import { User } from "../models/user"
import { ErrorResponse } from "../interfaces/errorResponse.interface"

const JWT = process.env.JWT_SECRET 
export const singToken = async (user: User):Promise<string> =>{
    try {
        if(!JWT){
            const errorResponse : ErrorResponse = {status: 404, message: "Secret Key Not Found"}
            throw errorResponse
        }
        const jwt = await sign({email: user.email, rol: user.rol}, JWT, {expiresIn: "2H"})
        return jwt  
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
    
}
export const verifyToken = async (jwt: string) =>{
    if(!JWT) return "KEY_NOT_FOUND"
    const jwtCorrect = await verify(jwt, JWT)
    return jwtCorrect
}