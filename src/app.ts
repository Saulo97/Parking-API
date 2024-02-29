import "dotenv/config"
import express, { json } from "express"
import cors from "cors";

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(json())



app.listen(PORT, ()=> {console.log(`🚀 Server Ready, Listening in Port ${PORT}`)})