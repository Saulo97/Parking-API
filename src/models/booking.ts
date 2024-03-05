import { DataTypes, Model } from "sequelize";
import { BookingInput, BookingInterface } from "../interfaces/booking.interface";
import { sequelizeConnection } from "../config/postgres.config";

export class Booking extends Model<BookingInterface, BookingInput> implements BookingInterface {
    id!: number;
    dateStart!: string;
    dateEnd!: string;
    userId: number | undefined;
    placeId: number | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    isDeleted?: boolean | undefined;
}

Booking.init({  
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dateStart:{
        type: DataTypes.DATE,
        allowNull: false
    },
    dateEnd:{
        type: DataTypes.DATE,
        allowNull: false
    },
    isDeleted:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    timestamps:true,
    sequelize: sequelizeConnection,
    tableName: 'bookings'
})




