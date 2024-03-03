import { Request, Response } from "express";
import { getUsers } from "../services/user";

export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await getUsers()
        res.sendStatus(200).send(response)
    } catch (error:any) {
        res.sendStatus(400).json(error.message??  error)
    }
}
export const getOneById = async (req: Request, res: Response): Promise<void> => {}
export const postOne = async (req: Request, res: Response): Promise<void> => {}
export const updateOne = async (req: Request, res: Response): Promise<void> => {}
export const deleteOne = async (req: Request, res: Response): Promise<void> => {}