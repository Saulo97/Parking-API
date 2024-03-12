import "dotenv/config"
import { connect } from "mongoose"

export const mongoDB = async (): Promise<void> => {
    const {NODE_ENV, MONGO_DB_URI_TEST,  MONGO_DB_URI} = process.env
    const DB_URI = NODE_ENV === 'test' ? MONGO_DB_URI_TEST! :  MONGO_DB_URI! 
    await connect(DB_URI)
}
