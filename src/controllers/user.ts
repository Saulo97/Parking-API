import { Request, Response } from "express";
import { getUser, getUsers } from "../services/user";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
        const response = await getUsers()
        res.sendStatus(200).send(response)
    } catch (error:any) {
        res.sendStatus(400).json({data:error?.message ||  error})
    }
}
export const getOneById = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = +req.params.id
        if(!id) res.sendStatus(404).json({data: "ID_PARAMS_NOT_FOUND"})
        const response = await getUser(id)
        res.sendStatus(200).send(response)       
    }catch(error: any){
        res.sendStatus(404).json({data: error?.message || error})
    }
}
export const postOne = async (req: Request, res: Response): Promise<void> => {}
export const updateOne = async (req: Request, res: Response): Promise<void> => {}
export const deleteOne = async (req: Request, res: Response): Promise<void> => {}