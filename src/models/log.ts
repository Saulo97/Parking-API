import { Schema, model } from "mongoose";
import { Log } from "../interfaces/log.interface";

const LogSchema = new Schema<Log>({
    message: {
        type:String,
        required: true
    }
},{
    timestamps: true,
    versionKey:false
})

export const LogModel = model('logs', LogSchema)