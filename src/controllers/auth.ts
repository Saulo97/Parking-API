import { Request, Response } from "express";
import { handleError } from "../utils/error.handle";
import { loginUser, registerUser } from "../services/auth";

export const registerController = async (req: Request, res: Response)=>{
    const user = req.body
    try {
        const response = await registerUser(user)
        res.status(200).json(response)
    } catch (error:any) {
        handleError(res, error.status, error.message)
    }
}
export const loginController = async (req: Request, res: Response)=>{
    const auth = req.body
    try {
        const response = await loginUser(auth)
        res.status(200).json(response)
    } catch (error:any) {
        handleError(res, error.status, error.message)
    }
}