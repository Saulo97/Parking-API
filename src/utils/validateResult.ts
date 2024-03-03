import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import { handleError } from "./error.handle";

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error: any) {
        handleError(res, 403, error.array())
    }
}