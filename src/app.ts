import "dotenv/config"
import express, { json } from "express"
import cors from "cors";
import { mongoDB } from "./config/mongo.config";
import { sequelize } from "./config/postgres.config";


const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(json())

const main = async () =>{
    try {
        await sequelize.authenticate()
        console.log("Connection to Postgres Database is Ready")
        await mongoDB()
        console.log("Connection to Mongo Database is Ready")    
    } catch (error) {
        console.error("Error to connect to Database")
    }
    app.listen(PORT, ()=> {console.log(`🚀 Server Ready, Listening in Port ${PORT}`)})
}

main()
