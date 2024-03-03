import { Request, Response } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../services/user";
import { Roles, UserInput } from "../interfaces/user.interface";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
        const response = await getUsers()
        res.status(200).json(response)
    } catch (error:any) {
        res.status(400).json({data:error})
    }
}
export const getOneById = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = +req.params.id
        if(!id) res.sendStatus(404).json({data: "ID_PARAMS_NOT_FOUND"})
        const response = await getUser(id)
        res.status(200).json(response)       
    }catch(error: any){
        res.status(404).json({data: error?.message || error})
    }
}
export const postOne = async (req: Request, res: Response): Promise<void> => {
    try{
        const {name, email, password, rol} = req.body
        const newUser: UserInput = {
            name: name,
            email: email,
            password: password, 
            rol: rol? rol: Roles.client
        }
        const response = await createUser(newUser)
        res.status(201).json(response)
    }catch(error:any){
        res.status(403).json({data: error?.message || error})
    }
}
export const updateOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = +req.params.id
        if(!id) res.sendStatus(404).json({data: "ID_PARAMS_NOT_FOUND"})
        const {name, email, password, rol} = req.body
        const newUser: UserInput = {
            name: name,
            email: email,
            password: password, 
            rol: rol? rol: Roles.client
        }
        const response = await updateUser(id, newUser)
        res.status(201).json(response)
    } catch (error:any){
        res.status(403).json({data: error?.message || error})
    }
}
export const deleteOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = +req.params.id
        if(!id) res.sendStatus(404).json({data: "ID_PARAMS_NOT_FOUND"})
        await deleteUser(id)
        res.status(200).json({data:"USER_DELETED_SUCCESSFULY"})
    } catch (error: any) {
        res.status(403).json({data: error?.message || error})
    }
}