import { UserInput } from "../interfaces/user.interface"
import { User } from "../models/user"

export const getUsers = async ():Promise<User[]>  =>{
    try {
        const response = await User.findAll()
        return response
    } catch (error) {
        throw Error("ERROR_GET_ITEMS")
    }
}
export const getUser = async (id:number): Promise<User | null> =>{
    try {
        const response = await User.findByPk(id)
        return response
    } catch (error) {
        throw Error("ERROR_ITEM_NOT_FOUND")
    }
}
export const createUser = async (user: UserInput): Promise<User | null> =>{
    try {
        const existUser = await User.findOne({where: {email : user.email}})
        if(existUser){
            throw Error("ERROR_USER_ALREADY_EXISTS")
        }
        const response = await User.create(user)
        return response
    } catch (error) {
        throw Error("ERROR_ITEM_NOT_CREATED")
    }
}
export const updateUser = async (id: number, user: UserInput): Promise<User| null> =>{
    try {
        const foundUser = await User.findByPk(id)
        if(!foundUser){
            throw Error("ERROR_ITEM_NOT_FOUND")  
        }else{
            foundUser.name = user.name ?? foundUser.name
            foundUser.email = user.email ?? foundUser.email
            foundUser.password = user.password ?? foundUser.password
            foundUser.rol = user.rol ?? foundUser.rol
            await foundUser.save()
            return foundUser
        }
    } catch (error) {
        throw Error("ERROR_ITEM_NOT_UPDATE")
    }
}
export const deleteUser = async (id: number): Promise<void> =>{
    try {
        const foundUser = await User.findByPk(id)
        if(!foundUser){
            throw Error("ITEM_NOT_FOUND")
        }else{
            await User.destroy({where: {id: id}})           
        }
    } catch (error) {
        throw Error("ERROR_ITEM_NOT_UPDATE")
    }
}