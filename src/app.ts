import "dotenv/config"
import express, { json } from "express"
import cors from "cors";
import swaggerUi from 'swagger-ui-express'
import { mongoDB } from "./config/mongo.config";
import { sequelizeConnection } from "./config/postgres.config";
import { router } from "./routes";
import './models/user'
import './models/parkingPlace'
import './models/booking'
import { swaggerSetup } from "./docs/swagger";


export const PORT = process.env.PORT || 3000
export const app = express()

app.use(cors())
app.use(json())
app.use(router)
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSetup))

const main = async () =>{
    try {
        await sequelizeConnection.sync({force: false, alter:true})
        console.log("Connection to Postgres Database is Ready")
        await mongoDB()
        console.log("Connection to Mongo Database is Ready")    
    } catch (error) {
        console.error("Error to connect to Database")
    }
    app.listen(PORT, ()=> {console.log(`🚀 Server Ready, Listening in Port ${PORT}`)})
}

main()

