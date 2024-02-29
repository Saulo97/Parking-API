import "dotenv/config"
import express, { json } from "express"
import cors from "cors";
import { mongoDB } from "./config/mongo.config";

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(json())


mongoDB().then(()=>{console.log('Connection to Database is Ready')})
app.listen(PORT, ()=> {console.log(`🚀 Server Ready, Listening in Port ${PORT}`)})