import { DataTypes, Model } from "sequelize";
import { Roles, UserInput, UserInterface } from '../interfaces/user.interface';
import { sequelizeConnection } from '../config/postgres.config';
import { ParkingPlaceInput, ParkingPlaceInterface } from "../interfaces/parkingPlace.interface";

export class ParkingPlace extends Model<ParkingPlaceInterface,ParkingPlaceInput> implements ParkingPlace {
    public id!: number;
    public name!: string;
}

ParkingPlace.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true   
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    sequelize: sequelizeConnection
})