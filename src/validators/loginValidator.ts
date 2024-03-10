import { check } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { validateResult } from "../utils/validateResult";

export const createUserValidator = [
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    check('password')
        .trim()
        .exists()
        .notEmpty()
        .isString(),
        (req: Request, res: Response, next: NextFunction)=>{
            validateResult(req, res, next)
        }
]