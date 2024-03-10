import { Router } from "express";
import { deleteOne, getAll, getAllOcupation, getOneById, postOne, updateOne } from "../controllers/booking";
import { updateBookingValidator } from '../validators/updateBookingValidator';
import { createBookingValidator } from "../validators/createBookingValidator";
import { authorize } from "../middlewares/authorize";
import { adminAuthorization } from "../middlewares/adminAuthorization";

export const bookingRouter = Router()

bookingRouter
        .get("/bookings", getAll)
        .post("/bookings", authorize,createBookingValidator,postOne)
        .put("/bookings/:id", authorize, adminAuthorization ,updateBookingValidator,updateOne)
        .delete("/bookings/:id", deleteOne)
        .get("/bookings/ocupation", getAllOcupation)
        .get("/bookings/:id", getOneById)