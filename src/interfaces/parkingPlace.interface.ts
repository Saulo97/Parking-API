import { Optional } from "sequelize";


export interface ParkingPlaceInterface{
    id: number,
    name: string
}

export interface ParkingPlaceInput extends Optional<ParkingPlaceInterface, 'id'> {}
export interface ParkingPlaceOutput extends Required<ParkingPlaceInterface>{}