import { ErrorResponse } from "../interfaces/errorResponse.interface"
import { Log } from "../interfaces/log.interface"
import { LogModel } from '../models/log';

export const createLog = async (message: string): Promise<void> => {
    try {
        await LogModel.create({message})
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}

export const getLogs = async (): Promise<Log[]>  => {
    try {
        const response = await LogModel.find({})
        return response
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}