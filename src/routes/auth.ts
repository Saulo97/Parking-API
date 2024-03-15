import { Router } from "express"
import { loginController, registerController } from "../controllers/auth"
import { createUserValidator } from '../validators/createUserValidator';
import { loginValidator } from "../validators/loginValidator";

export const authRouter = Router()

authRouter
        .post("/login", loginValidator,loginController)
        /**
         * @swagger
         * /login:
         *   post:
         *      tags: 
         *              - Auth
         *      summary: Logear un usuario
         *      requestBody:
         *              description: Esquema de Login
         *              required: true
         *              content:
         *                      application/json:
         *                              schema: 
         *                                      $ref: '#/components/schemas/Auth'
         *      responses:
         *              200:
         *                      description: Succeful login
         *                      content:
         *                              application/json:
         *                                      schema:
         *                                              $ref: '#/components/schemas/ApiResponse'
         *              403:
         *                      description: Error in request body
         *                      content:
         *                              application/json:
         *                                      schema:
         *                                              type: array
         *                                              items:
         *                                                      $ref: '#/components/schemas/ApiErrorValidationResponse'
         *              404:
         *                      description: User Not Found
         *                      content:
         *                              application/json:
         *                                      schema:
         *                                              $ref: '#/components/schemas/ApiErrorResponse'
         *              500:
         *                      description: Internal Server Error
         *                      content:
         *                              application/json:
         *                                      schema:
         *                                              $ref: '#/components/schemas/ApiErrorResponse'
         *              
         */
        .post("/register", createUserValidator,registerController)
        /**
         * @swagger
         * /register:
         *   post:
         *      tags: 
         *              - Auth
         *      summary: Registrar un nuevo usuario
         *      requestBody:
         *              description: Esquema de Nuevo Usuario
         *              required: true
         *              content:
         *                      application/json:
         *                              schema: 
         *                                      $ref: '#/components/schemas/UserInput'
         *      responses:
         *              200:
         *                      description: Succeful login
         *                      content:
         *                              application/json:
         *                                      schema:
         *                                              $ref: '#/components/schemas/User'
         *              403:
         *                      description: Error in request body
         *                      content:
         *                              application/json:
         *                                      schema:
         *                                              type: array
         *                                              items:
         *                                                      $ref: '#/components/schemas/ApiErrorValidationResponse'
         *              404:
         *                      description: User Not Found
         *                      content:
         *                              application/json:
         *                                      schema:
         *                                              $ref: '#/components/schemas/ApiErrorResponse'
         *              500:
         *                      description: Internal Server Error
         *                      content:
         *                              application/json:
         *                                      schema:
         *                                              $ref: '#/components/schemas/ApiErrorResponse'
         *              
         */