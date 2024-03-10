import { Request, Response } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../services/user";
import { Roles, UserInput } from "../interfaces/user.interface";
import { handleError } from "../utils/error.handle";

export const getAll = async (req: Request, res: Response): Promise<void> => {
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
        if(!id || typeof id !== "number" ) throw {status: 400, message: "Error In Param Id "}
        const response = await getUser(id)
        res.status(200).json(response)       
    }catch(error:any) {
        handleError(res, error.status, error.message)
    }
}
// export const postOne = async (req: Request, res: Response): Promise<void> => {
//     try{
//         const {name, email, password, rol} = req.body
//         const newUser: UserInput = {
//             name: name,
//             email: email,
//             password: password, 
//             rol: rol? rol: Roles.client
//         }
//         const response = await createUser(newUser)
//         res.status(201).json(response)
//     }catch(error:any) {
//         handleError(res, error.status, error.message)
//     }
// }
export const updateOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = +req.params.id
        if(!id || typeof id !== "number" ) throw {status: 400, message: "Error In Param Id "}
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
        if(!id || typeof id !== "number" ) throw {status: 400, message: "Error In Param Id "}
        const response = await deleteUser(id)
        res.status(200).json(response)
    } catch (error:any) {
        handleError(res, error.status, error.message)
    }
}