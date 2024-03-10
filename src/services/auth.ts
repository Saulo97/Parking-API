import { Auth } from "../interfaces/auth.interface"
import { ErrorResponse } from "../interfaces/errorResponse.interface"
import { Roles, UserInput } from "../interfaces/user.interface"
import { User } from "../models/user"
import { encrypt, verify } from "../utils/bcrypt.handle"
import { singToken } from "../utils/jwt.handle"

export const registerUser = async(user : UserInput): Promise<User>=>{
    try {
        const foundUser = await User.findOne({where:{email: user.email}})
        if(foundUser){
            const errorResponse : ErrorResponse = {status: 404, message: "User Already Exist"}
            throw errorResponse
        }
        const passEncrypt = await encrypt(user.password)
        const userRol = user.rol?? Roles.client
        const newUser = await User.create({ ...user, password : passEncrypt, rol: userRol })
        return newUser
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
    
}
export const loginUser = async(auth: Auth)=>{
    try {
        const foundUser = await User.findOne({where:{email:auth.email}})
        if(!foundUser){
            const errorResponse : ErrorResponse = {status: 404, message: "User Is Not Exist"}
            throw errorResponse
        }
        const password = foundUser.password
        const passCorrect = await verify(auth.password, password)
        if(!passCorrect){
            const errorResponse : ErrorResponse = {status: 404, message: "Password Is Not Correct"}
            throw errorResponse
        }
        const token = await singToken(foundUser)
        return token  
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }  
}