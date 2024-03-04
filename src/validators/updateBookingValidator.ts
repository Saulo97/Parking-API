import { check } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { validateResult } from "../utils/validateResult";

export const updateBookingValidator = [
    check('dateStart')
        .optional() 
        .trim()
        .notEmpty()
        .matches('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$'),
    check('dateEnd')
        .optional()
        .trim()
        .notEmpty()
        .matches('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$'),
    check('userId')
        .optional()
        .trim()
        .notEmpty()
        .isNumeric(),
    check('placeId')
        .optional()
        .trim()
        .notEmpty()
        .isNumeric(),
        (req: Request, res: Response, next: NextFunction)=>{
            validateResult(req, res, next)
        }
]