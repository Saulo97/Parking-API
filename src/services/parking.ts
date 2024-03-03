import { ErrorResponse } from '../interfaces/errorResponse.interface';
import { ParkingPlace } from "../models/parkingPlace";
import { ParkingPlaceInput } from "../interfaces/parkingPlace.interface";

export const getParkingPlaces = async ():Promise<ParkingPlace[]>  =>{
    try {
        const response = await ParkingPlace.findAll()
        if(!response || response === null || response === undefined ){
            const errorResponse : ErrorResponse = {status: 404, message: "Parking Places Not Found"}
            throw errorResponse
        }
        return response
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}
export const getParkingPlace = async (id:number): Promise<ParkingPlace | null> =>{
    try {
        const response = await ParkingPlace.findByPk(id)
        if(!response || response === null || response === undefined){
            const errorResponse : ErrorResponse = {status: 404, message: "Parking Place Not Found By Id"}
            throw errorResponse
        }
        return response
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}
export const createParkingPlace = async (parkingPlace: ParkingPlaceInput): Promise<ParkingPlace | null> =>{
    try {
        const response = await ParkingPlace.create(parkingPlace)
        return response
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}
export const updateParkingPlace = async (id: number, parkingPlace: ParkingPlaceInput): Promise<ParkingPlace| null> =>{
    try {
        const foundPlace = await ParkingPlace.findByPk(id)
        if(!foundPlace){
            const errorResponse : ErrorResponse = {status: 404, message: "Parking Place Not Found By Id"}
            throw errorResponse 
        }else{
            foundPlace.name = parkingPlace.name ?? foundPlace.name
            await foundPlace.save()
            return foundPlace
        }
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}
export const deleteParkingPlace = async (id: number): Promise<void> =>{
    try {
        const foundPlace = await ParkingPlace.findByPk(id)
        if(!foundPlace){
            const errorResponse : ErrorResponse = {status: 404, message: "Parking Place Not Found By Id"}
            throw errorResponse
        }else{
            await ParkingPlace.destroy({where: {id: id}})           
        }
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}