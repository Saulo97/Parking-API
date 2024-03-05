import { User } from "../models/user"
import { ErrorResponse } from '../interfaces/errorResponse.interface';
import { Booking } from "../models/booking";
import { BookingInput } from "../interfaces/booking.interface";

export const getBookings = async ():Promise<Booking[]>  =>{
    try {
        const response = await Booking.findAll()
        if(!response || response === null || response === undefined ){
            const errorResponse : ErrorResponse = {status: 404, message: "Bookings Not Found"}
            throw errorResponse
        }
        return response
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}
export const getBooking = async (id:number): Promise<Booking | null> =>{
    try {
        const response = await Booking.findByPk(id)
        if(!response || response === null || response === undefined){
            const errorResponse : ErrorResponse = {status: 404, message: "Booking Not Found By Id"}
            throw errorResponse
        }
        return response
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}
export const createBooking = async (booking: BookingInput): Promise<Booking | null> =>{
    try {
        // const existUser = await User.findOne({where: {email : user.email}})
        // if(existUser){
        //     const errorResponse : ErrorResponse = {status: 400, message: "Email Is Already Exist"}
        //     throw errorResponse
        // }
        const response = await Booking.create(booking)
        return response
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}
export const updateBooking = async (id: number, booking: BookingInput): Promise<Booking| null> =>{
    try {
        const foundBooking = await Booking.findByPk(id)
        if(!foundBooking){
            const errorResponse : ErrorResponse = {status: 404, message: "Booking Not Found By Id"}
            throw errorResponse 
        }else{
            foundBooking.dateStart= booking.dateStart?? foundBooking.dateStart
            foundBooking.dateEnd= booking.dateEnd?? foundBooking.dateEnd
            foundBooking.placeId= booking.placeId?? foundBooking.placeId
            foundBooking.userId= booking.userId?? foundBooking.userId
            
            await foundBooking.save()
            return foundBooking
        }
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}
export const deleteBooking = async (id: number): Promise<void> =>{
    try {
        const foundUser = await Booking.findByPk(id)
        if(!foundUser){
            const errorResponse : ErrorResponse = {status: 404, message: "Booking Not Found By Id"}
            throw errorResponse
        }else{
            await User.destroy({where: {id: id}})           
        }
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse
    }
}