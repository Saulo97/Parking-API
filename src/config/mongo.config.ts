import "dotenv/config"
import { connect } from "mongoose"

export const mongoDB = async (): Promise<void> => {
    const DB_URI = process.env.MONGO_DB_URI|| 'mongodb://localhost:27017/api-rest-ts'
    await connect(DB_URI)
}