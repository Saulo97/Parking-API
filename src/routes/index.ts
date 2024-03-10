import { Router } from "express";
import { userRoutes } from "./user";
import { parkingRouter } from "./parking";
import { bookingRouter } from "./booking";
import { authRouter } from "./auth";

export const router = Router()

router  
        .use(userRoutes)
        .use(parkingRouter)
        .use(bookingRouter)
        .use(authRouter)
