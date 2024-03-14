import {UserInput} from "../interfaces/user.interface"
import { User } from "../models/user"
import { ErrorResponse } from '../interfaces/errorResponse.interface';

export const getUsers = async ():Promise<User[]>  =>{
    try {
        const response = await User.findAll({where:{isDeleted: false}})
        if(!response || response === null || response === undefined ){
            const errorResponse : ErrorResponse = {status: 404, message: "Users Not Found"}
            throw errorResponse
        }
        return response
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}
export const getUser = async (id:number): Promise<User | null> =>{
    try {
        const response = await User.findByPk(id)
        if(!response || response === null || response === undefined){
            const errorResponse : ErrorResponse = {status: 404, message: "User Not Found By Id"}
            throw errorResponse
        }if(response.isDeleted == true){
            const errorResponse : ErrorResponse = {status: 404, message: "This User is not exist"}
            throw errorResponse
        }
        return response
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}
// export const createUser = async (user: UserInput): Promise<User | null> =>{
//     try {
//         const existUser = await User.findOne({where: {email : user.email}})
//         if(existUser){
//             const errorResponse : ErrorResponse = {status: 400, message: "Email Is Already Exist"}
//             throw errorResponse
//         }
//         const response = await User.create(user)
//         return response
//     } catch (error: any) {
//         const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
//         throw errorResponse
//     }
// }
export const updateUser = async (id: number, user: UserInput): Promise<User| null> =>{
    try {
        const foundUser = await User.findByPk(id)
        if(!foundUser){
            const errorResponse : ErrorResponse = {status: 404, message: "User Not Found By Id"}
            throw errorResponse 
        }if(foundUser.isDeleted == true){
            const errorResponse : ErrorResponse = {status: 404, message: "This User is not exist"}
            throw errorResponse
        }else{
            foundUser.name = user.name ?? foundUser.name
            foundUser.email = user.email ?? foundUser.email
            foundUser.password = user.password ?? foundUser.password
            foundUser.rol = user.rol ?? foundUser.rol
            await foundUser.save()
            return foundUser
        }
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}
export const deleteUser = async (id: number): Promise<User> =>{
    try {
        const foundUser = await User.findByPk(id)
        if(!foundUser){
            const errorResponse : ErrorResponse = {status: 404, message: "User Not Found By Id"}
            throw errorResponse
        }if(foundUser.isDeleted == true){
            const errorResponse : ErrorResponse = {status: 404, message: "This User is not exist"}
            throw errorResponse
        }else{
            foundUser.isDeleted = true
            await foundUser.save()
            return foundUser
            // await User.destroy({where: {id: id}})           
        }
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}