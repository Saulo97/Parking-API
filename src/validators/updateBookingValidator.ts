import { check } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { validateResult } from "../utils/validateResult";

export const updateBookingValidator = [
    check('dateStart')
        .trim()
        .exists()
        .notEmpty()
        .isDate(),
    check('dateEnd')
        .trim()
        .exists()
        .notEmpty()
        .isDate(),
    check('userId')
        .trim()
        .exists()
        .notEmpty()
        .isNumeric(),
    check('placeId')
        .trim()
        .exists()
        .notEmpty()
        .isNumeric(),
        (req: Request, res: Response, next: NextFunction)=>{
            validateResult(req, res, next)
        }
]