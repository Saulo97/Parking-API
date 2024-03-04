import { Optional } from "sequelize";

export interface BookingInterface {
    id: number,
    dateStart: string,
    dateEnd: string,
    userId?: number,
    placeId?: number
    createdAt?: string,
    updatedAt?: string,
    isDeleted?: boolean
}

export interface BookingInput extends Optional<BookingInterface, 'id'|'createdAt'|'updatedAt'|'isDeleted'>{}
export interface BookingOutput extends Required<BookingInterface>{}