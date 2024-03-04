import { check } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { validateResult } from "../utils/validateResult";

export const createBookingValidator = [
    check('dateStart')
        .exists()
        .trim()
        .notEmpty()
        .isDate(),
    check('dateEnd')
        .exists()
        .trim()
        .notEmpty()
        .isDate(),
    check('userId')
        .exists()
        .trim()
        .notEmpty()
        .isNumeric(),
    check('placeId')
        .exists()
        .trim()
        .notEmpty()
        .isNumeric(),
        (req: Request, res: Response, next: NextFunction)=>{
            validateResult(req, res, next)
        }
]