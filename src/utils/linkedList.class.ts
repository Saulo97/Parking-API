import { BookingInput, BookingOutput } from '../interfaces/booking.interface';
import { Booking } from '../models/booking';
export class Node{
    public value: Booking
    public next: Node| null 
    

    constructor( value: Booking){
        this.value = value,
        this.next = null
    }
}


export class LinkedList {
    public head: Node| null = null
    public tail: Node| null = null
    constructor(){
        this.head = null,
        this.tail = null
    }
    append(value: Booking){
        const newNode = new Node(value)
        if(!this.head){
            this.head = newNode
        }else{
            let current = this.head
            while(current.next){
                current = current.next
            }
            current.next = newNode
        }
        this.tail = newNode
    }
    traverse(callback: any){
        let current = this.head
        while(current){
            callback(current)
            current = current.next
        }
    }
    isAvailable(booking : BookingInput){
        let current: Node| null = this.head
        while(current){
            if(!current.next){
                if(current.value.dateEnd < booking.dateStart){
                    return true
                }else{
                    return false
                }
            }
            if(current.value.dateEnd < booking.dateStart && current.next?.value.dateStart > booking.dateEnd ){
                return true
            }else{
                false
            }
            current = current.next
        }
    }


}