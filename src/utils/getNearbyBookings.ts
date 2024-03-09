import { BookingInput } from "../interfaces/booking.interface"
import { Booking } from "../models/booking"
import { getDayOfDate } from "./getDayOfDate"

export const getNearbyBookings = (bookingList : Booking[], targetBooking: BookingInput): Booking[]=>{
    const targetBookings = bookingList.filter((booking: Booking)=>{
        if(getDayOfDate(booking.dateStart)==getDayOfDate(targetBooking.dateStart) ||getDayOfDate(booking.dateEnd)==getDayOfDate(targetBooking.dateEnd) ){
            return booking
        }else{
            return
        }
    })
    return targetBookings
}