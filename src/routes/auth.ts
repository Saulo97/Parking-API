import { Router } from "express"
import { loginController, registerController } from "../controllers/auth"
import { createUserValidator } from '../validators/createUserValidator';

export const authRouter = Router()

authRouter
        .post("/login", loginController)
        .post("/register", createUserValidator,registerController)
        