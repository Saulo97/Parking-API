import { check } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { validateResult } from "../utils/validateResult";

export const createBookingValidator = [
    
    check('dateStart')
        .exists()
        .trim()
        .notEmpty()
        .matches('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T(2[0-3]|[01][0-9]):[0-5][0-9]$')
        .custom((value, {req})=>{
            const now = formatDate(new Date())
            if(value>req.body.dateEnd){
                throw new Error("The start date is after that end start")
            }else if(value< now){
                throw new Error("The start date is before today")
            }else{
                return true
            }
        }),
    check('dateEnd')
        .exists()
        .trim()
        .notEmpty()
        .matches('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T(2[0-3]|[01][0-9]):[0-5][0-9]$')
        .custom((value, {req})=>{
            const now = formatDate(new Date())
            if(value< now){
                throw new Error("The end date is before today")
            }else{
                return true
            }
        }),
    check('userId')
        .exists()
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

const padTo2Digits=(num: number)=> {
    return num.toString().padStart(2, '0');
  }
  
  // 👇️ format as "YYYY-MM-DD hh:mm:ss"
  // You can tweak formatting easily
export const formatDate =(date: Date) => {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      'T' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }