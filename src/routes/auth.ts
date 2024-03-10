import { Router } from "express"
import { loginController, registerController } from "../controllers/auth"
import { createUserValidator } from '../validators/createUserValidator';
import { loginValidator } from "../validators/loginValidator";

export const authRouter = Router()

authRouter
        .post("/login", loginValidator,loginController)
        .post("/register", createUserValidator,registerController)
        