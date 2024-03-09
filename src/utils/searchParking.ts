import { BookingInput } from "../interfaces/booking.interface"
import { Booking } from "../models/booking"
import { ParkingPlace } from "../models/parkingPlace"
import { findBookingByPlace } from "../services/booking"
import { getNearbyBookings } from "./getNearbyBookings"
import { LinkedList } from "./linkedList.class"

export const searchParking = async(places: ParkingPlace[], newBooking: BookingInput): Promise<ParkingPlace[]>=>{  
    let freePlaces: ParkingPlace[] = []
    for(let place of places ){
        const bookingsList: Booking[] = await findBookingByPlace(place)
        if(bookingsList.length === 0){
            // freePlaces.push(place)
            freePlaces.push(place)
            break
        }else{
            const targetBookings = getNearbyBookings(bookingsList, newBooking)
            
            if(targetBookings.length === 0) {
                freePlaces.push(place)
                break
            }else{
                const linkedList = new LinkedList()
                targetBookings.forEach((booking: Booking)=>{
                    linkedList.append(booking)
                })
                if(linkedList.head?.value.dateStart! > newBooking.dateEnd){
                    freePlaces.push(place)
                    break
                }else if(linkedList.tail?.value.dateEnd! < newBooking.dateStart){
                    freePlaces.push(place)
                    break
                }else if(linkedList.isAvailable(newBooking)){
                    freePlaces.push(place)
                    break
                }else{
                }
            }
        }
    }
    return freePlaces
}