import { Router } from "express";
import { userRoutes } from "./user";
import { parkingRouter } from "./parking";
import { bookingRouter } from "./booking";

export const router = Router()

router.use(userRoutes)
router.use(parkingRouter)
router.use(bookingRouter)