import { Request, Response } from "express";
import { handleError } from "../utils/error.handle";
import { createBooking, deleteBooking, getBooking, getBookings, getCurrentAvailable, updateBooking } from "../services/booking";
import { BookingInput } from "../interfaces/booking.interface";
import { User } from "../models/user";
import { where } from "sequelize";
import { createLog } from "../services/log";

export const getAll = async (req: Request, res: Response): Promise<void> => {
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
export const getAllOcupation = async (req: Request, res: Response): Promise<void> => {
    try{
        const response = await getCurrentAvailable()
        res.status(200).json(response)       
    }catch(error:any) {
        handleError(res, error.status, error.message)
    }
}

export const postOne = async (req: Request, res: Response): Promise<void> => {
    try{
        const {email} = req.body.user
        const user = await User.findOne({where:{email : email}})
        const {dateStart, dateEnd,  placeId} = req.body
        const newBooking: BookingInput = {
            dateStart: dateStart,
            dateEnd: dateEnd,
            userId: user?.id,
            placeId: placeId
        }
        const response = await createBooking(newBooking)
        await createLog(`The user with email ${email} has created a new Booking with start date: ${dateStart}, and end date: ${dateEnd}`)
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