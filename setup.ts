import { Client } from "pg";
import { mongoDB } from "./src/config/mongo.config";
import { sequelizeConnection } from "./src/config/postgres.config";
import { ParkingPlaceInput } from "./src/interfaces/parkingPlace.interface";
import { Roles, UserInput } from "./src/interfaces/user.interface";
import { ParkingPlace } from "./src/models/parkingPlace";
import { User } from "./src/models/user";
import { encrypt } from "./src/utils/bcrypt.handle";
import 'dotenv/config'
import { BookingInput } from "./src/interfaces/booking.interface";
import { Booking } from "./src/models/booking";

const main = async() => {
    const NAME_DB_PG = process.env.NAME_DB_PG
    const clientPG = new Client({
        host: process.env.HOST_DB_PG,
        user: process.env.USER_DB_PG,
        password: process.env.PASS_DB_PG,
        port: 5432,
    })
    const passHass = await encrypt("1234567")
    const newClient: UserInput = {
        name: "Client",
        email: "cliente@gmail.com",
        password: `${passHass}`,
        rol: Roles.client
    }
    const newAdmin: UserInput = {
        name: "Admin",
        email: "admin@gmail.com",
        password: `${passHass}`,
        rol: Roles.admin
    }
    const newEmployee: UserInput = {
        name: "Employee",
        email: "employee@gmail.com",
        password: `${passHass}`,
        rol: Roles.employee
    }
    const newBooking: BookingInput = {
        dateStart: "2024-07-20T10:00",
        dateEnd: "2024-07-20T10:30"
    }
    const newPlace: ParkingPlaceInput = {
        name: "Place 001"
    }
    const newPlace2: ParkingPlaceInput = {
        name: "Place 002"
    }
    try {
        await clientPG.connect()
        const res = await clientPG.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${NAME_DB_PG}'`)
        if (res.rowCount === 0) {
            await clientPG.query(`CREATE DATABASE "${NAME_DB_PG}";`)
            await clientPG.end()
            await sequelizeConnection.sync({force: false, alter:true})
            await User.create(newAdmin)
            await User.create(newEmployee)
            const client = await User.create(newClient)
            const place = await ParkingPlace.create(newPlace)
            await ParkingPlace.create(newPlace2)
            await Booking.create({userId: client.id, placeId: place.id, ...newBooking})
            await sequelizeConnection.close()
            console.log("Preset Database Success")
        } else {
            await clientPG.end()
        }
        
    } catch (error) {
        console.log("Error to preset data in database")
        await clientPG.end()
    }

}


main()