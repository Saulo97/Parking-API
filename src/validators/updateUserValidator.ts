import { check } from "express-validator";
import { Roles } from "../interfaces/user.interface";
import { NextFunction, Request, Response } from "express";
import { validateResult } from "../utils/validateResult";

export const updateUserValidator = [
    check('name')
        .optional()
        .trim()
        .notEmpty()
        .isString(),
    check('email')
        .optional()
        .notEmpty()
        .isEmail(),
    check('password')
        .optional()
        .trim()
        .notEmpty()
        .isString(),
    check('rol')
        .optional()
        .isIn([Roles.admin,Roles.client,Roles.employee]),
        (req: Request, res: Response, next: NextFunction)=>{
            validateResult(req, res, next)
        }
]