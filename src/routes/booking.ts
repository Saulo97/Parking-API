import { Router } from "express";
import { deleteOne, getAll, getOneById, postOne, updateOne } from "../controllers/booking";
import { updateBookingValidator } from '../validators/updateBookingValidator';
import { createBookingValidator } from "../validators/createBookingValidator";

export const bookingRouter = Router()

bookingRouter
        .get("/bookings", getAll)
        .post("/bookings", createBookingValidator,postOne)
        .put("/bookings/:id", updateBookingValidator,updateOne)
        .delete("/bookings/:id", deleteOne)
        .get("/bookings/:id", getOneById)