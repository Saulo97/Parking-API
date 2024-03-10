import { Router } from "express";
import { deleteOne, getAll, getAllOcupation, getOneById, postOne, updateOne } from "../controllers/booking";
import { updateBookingValidator } from '../validators/updateBookingValidator';
import { createBookingValidator } from "../validators/createBookingValidator";
import { authorize } from "../middlewares/authorize";
import { adminAuthorization } from "../middlewares/adminAuthorization";
import { isAdminOrEmployee } from "../middlewares/adminEmployeeAuthorization";

export const bookingRouter = Router()

bookingRouter
        .get("/bookings", authorize,isAdminOrEmployee,getAll)
        .post("/bookings", authorize,createBookingValidator,postOne)
        .put("/bookings/:id", authorize, isAdminOrEmployee,updateBookingValidator,updateOne)
        .delete("/bookings/:id", authorize,deleteOne)
        .get("/bookings/ocupation", authorize,isAdminOrEmployee,getAllOcupation)
        .get("/bookings/:id", authorize,getOneById)