import { check } from "express-validator";
import { Roles } from "../interfaces/user.interface";
import { NextFunction, Request, Response } from "express";
import { validateResult } from "../utils/validateResult";

export const createUserValidator = [
    check('name')
        .trim()
        .exists()
        .notEmpty()
        .isString(),
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    check('password')
        .trim()
        .exists()
        .notEmpty()
        .isString(),
    check('rol')
        .optional()
        .isIn([Roles.admin,Roles.client,Roles.employee]),
        (req: Request, res: Response, next: NextFunction)=>{
            validateResult(req, res, next)
        }
]