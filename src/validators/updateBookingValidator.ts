import { check } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { validateResult } from "../utils/validateResult";

export const updateBookingValidator = [
    check('dateStart')
        .optional() 
        .trim()
        .notEmpty()
        .isDate(),
    check('dateEnd')
        .optional()
        .trim()
        .notEmpty()
        .isDate(),
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