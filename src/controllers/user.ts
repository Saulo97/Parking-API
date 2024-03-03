import { Request, Response } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../services/user";
import { Roles, UserInput } from "../interfaces/user.interface";
import { handleError } from "../utils/error.handle";
import { ErrorResponse } from "../interfaces/errorResponse.interface";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
        const response = await getUsers()
        res.status(200).json(response)
    } catch (error:any) {
        handleError(res, error.status, error.message)
    }
}
export const getOneById = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = +req.params.id
        if(!id) res.sendStatus(404).json({data: "ID_PARAMS_NOT_FOUND"})
        const response = await getUser(id)
        res.status(200).json(response)       
    }catch(error:any) {
        handleError(res, error.status, error.message)
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
    }catch(error:any) {
        handleError(res, error.status, error.message)
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
    } catch (error:any) {
        handleError(res, error.status, error.message)
    }
}
export const deleteOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = +req.params.id
        if(!id) res.sendStatus(404).json({data: "ID_PARAMS_NOT_FOUND"})
        await deleteUser(id)
        res.status(200).json({data:"USER_DELETED_SUCCESSFULY"})
    } catch (error:any) {
        handleError(res, error.status, error.message)
    }
}