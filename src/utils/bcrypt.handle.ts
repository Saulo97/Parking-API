import { compare, hash } from "bcrypt"

export const encrypt = async (password: string): Promise<string> =>{
    const passwordHash = await hash(password, 8)
    return passwordHash
}
export const verify = async (password: string, passHash: string): Promise<boolean> =>{
    const passCorrect = await compare(password, passHash)
    return passCorrect
}