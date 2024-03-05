import { Request, Response } from "express";
import { handleError } from "../utils/error.handle";
import { createBooking, deleteBooking, getBooking, getBookings, updateBooking } from "../services/booking";
import { BookingInput } from "../interfaces/booking.interface";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
        const response = await getBookings()
        res.status(200).json(response)
    } catch (error:any) {
        handleError(res, error.status, error.message)
    }
}
export const getOneById = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = +req.params.id
        if(!id || typeof id !== "number" ) throw {status: 400, message: "Error In Param Id "}
        const response = await getBooking(id)
        res.status(200).json(response)       
    }catch(error:any) {
        handleError(res, error.status, error.message)
    }
}
export const postOne = async (req: Request, res: Response): Promise<void> => {
    try{
        const {dateStart, dateEnd, userId, placeId} = req.body
        const newBooking: BookingInput = {
            dateStart: dateStart,
            dateEnd: dateEnd,
            userId: userId,
            placeId: placeId
        }
        const response = await createBooking(newBooking)
        res.status(201).json(response)
    }catch(error:any) {
        handleError(res, error.status, error.message)
    }
}
export const updateOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = +req.params.id
        if(!id || typeof id !== "number" ) throw {status: 400, message: "Error In Param Id "}
        const {dateStart, dateEnd, userId, placeId} = req.body
        const newBooking: BookingInput = {
            dateStart: dateStart,
            dateEnd: dateEnd,
            userId: userId,
            placeId: placeId
        }
        const response = await updateBooking(id,newBooking)
        res.status(201).json(response)
    } catch (error:any) {
        handleError(res, error.status, error.message)
    }
}
export const deleteOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = +req.params.id
        if(!id || typeof id !== "number" ) throw {status: 400, message: "Error In Param Id "}
        const response = await deleteBooking(id)
        res.status(200).json(response)
    } catch (error:any) {
        handleError(res, error.status, error.message)
    }
}