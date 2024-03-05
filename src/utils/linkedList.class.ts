import { Booking } from '../models/booking';
export class Node<Booking>{
    public value
    public next: Node<Booking>| null 
    constructor( value: Booking, next = null){
        this.value = value,
        this.next = next
    }
}


export class LinkedList<Booking> {
    public head: Node<Booking> | null = null

    append(value: Booking){
        const newNode = new Node<Booking>(value)
        if(!this.head){
            this.head = newNode
            return
        }else{
            let current = this.head
            while(current.next !== null){
                current = current.next
            }
            current.next = newNode
        }
    }
    traverse(callback: any){
        let current = this.head
        while(current !== null){
            callback(current)
            current = current.next
        }
    }


}