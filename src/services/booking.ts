import { ErrorResponse } from '../interfaces/errorResponse.interface';
import { Booking } from '../models/booking';
import { BookingInput } from "../interfaces/booking.interface";
import { LinkedList} from "../utils/linkedList.class";
import { ParkingPlace } from "../models/parkingPlace";
import { getNearbyBookings } from '../utils/getNearbyBookings';
import { searchParking } from '../utils/searchParking';

export const getBookings = async ():Promise<Booking[]>  =>{
    try {
        const response = await Booking.findAll()
        if(!response || response === null || response === undefined ){
            const errorResponse : ErrorResponse = {status: 404, message: "Bookings Not Found"}
            throw errorResponse
        }
        //Aqui se recogen las reservas de la base de datos y se guardan en una linked list
        // const linkedList = new LinkedList()
        // response.map((item)=>{
        //     linkedList.append(item)
        //     return item
        // })
        // const print = (node:any) =>{console.log(`Valor: ${node.value.id} || Next: ${node.next?.value.id}`)}
        // linkedList.traverse(print)
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
        const parkingPlaces = await ParkingPlace.findAll()
        //Si no existen parking places lanzar un error
        const parkingsFree = await searchParking(parkingPlaces, booking)
        if(parkingsFree.length == 0 ){
            const errorResponse : ErrorResponse = {status: 404, message: "No available parking has been found for these hours"}
            throw errorResponse 
        }else{
            const place = await parkingsFree.shift()
            booking.placeId = place?.id
            const response = await Booking.create(booking)
            return response
        }
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
export const deleteBooking = async (id: number): Promise<Booking> =>{
    try {
        const foundUser = await Booking.findByPk(id)
        if(!foundUser){
            const errorResponse : ErrorResponse = {status: 404, message: "Booking Not Found By Id"}
            throw errorResponse
        }if(foundUser.isDeleted == true){
            const errorResponse : ErrorResponse = {status: 404, message: "This Booking is not exist"}
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

export const findBookingByPlace = async( place: ParkingPlace ): Promise<Booking[]> => {
    try {
        const bookings = await Booking.findAll({where:{placeId: place.id, isDeleted: false}, order: [['dateStart', 'ASC']]})
        return bookings
    } catch (error: any) {
        const errorResponse : ErrorResponse = {status: error?.status || 500, message: error?.message || "Server Error"}
        throw errorResponse 
    }
}
