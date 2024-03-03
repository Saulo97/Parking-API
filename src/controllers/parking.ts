import { Request, Response } from "express";
import { Roles, UserInput } from "../interfaces/user.interface";
import { handleError } from "../utils/error.handle";
import { createParkingPlace, deleteParkingPlace, getParkingPlace, getParkingPlaces, updateParkingPlace } from "../services/parking";
import { ParkingPlaceInput } from "../interfaces/parkingPlace.interface";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
        const response = await getParkingPlaces()
        res.status(200).json(response)
    } catch (error:any) {
        handleError(res, error.status, error.message)
    }
}
export const getOneById = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = +req.params.id
        if(!id || typeof id !== "number" ) throw {status: 400, message: "Error In Param Id "}
        const response = await getParkingPlace(id)
        res.status(200).json(response)       
    }catch(error:any) {
        handleError(res, error.status, error.message)
    }
}
export const postOne = async (req: Request, res: Response): Promise<void> => {
    try{
        const {name} = req.body
        const newPlace: ParkingPlaceInput = {
            name: name,
        }
        const response = await createParkingPlace(newPlace)
        res.status(201).json(response)
    }catch(error:any) {
        handleError(res, error.status, error.message)
    }
}
export const updateOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = +req.params.id
        if(!id || typeof id !== "number" ) throw {status: 400, message: "Error In Param Id "}
        const {name} = req.body
        const newPlace: ParkingPlaceInput = {
            name: name,
        }
        const response = await updateParkingPlace(id, newPlace)
        res.status(201).json(response)
    } catch (error:any) {
        handleError(res, error.status, error.message)
    }
}
export const deleteOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = +req.params.id
        if(!id || typeof id !== "number" ) throw {status: 400, message: "Error In Param Id "}
        await deleteParkingPlace(id)
        res.status(200).json({data:"PARKING_PLACE_DELETED_SUCCESSFULY"})
    } catch (error:any) {
        handleError(res, error.status, error.message)
    }
}