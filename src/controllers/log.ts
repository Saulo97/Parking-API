import { Request, Response } from "express";
import { getLogs } from "../services/log";
import { handleError } from "../utils/error.handle";

export const getAll = async(req: Request, res: Response): Promise<void> =>{
    try {
        const response = await getLogs()
        res.status(200).json(response)
    }catch (error:any) {
        handleError(res, error.status, error.message)
    }
}