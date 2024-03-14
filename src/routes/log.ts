import { Router } from "express";
import { authorize } from "../middlewares/authorize";
import { adminAuthorization } from "../middlewares/adminAuthorization";
import { getAll } from "../controllers/log";

export const logRoutes = Router()


logRoutes.get('/logs', authorize, adminAuthorization, getAll)
/**
         * @swagger
         * /logs:
         *   get:
         *      tags: 
         *              - Logs
         *      summary: Obtener los logs del api
         *      description: Devuelve un arreglo de Logs. Solamente el admin tiene acceso a este endpoint
         *      security: 
         *              - bearerAuth: []
         *      responses:
         *              200:
         *                      description: Succeful login
         *                      content:
         *                              application/json:
         *                                      schema:
         *                                              $ref: '#/components/schemas/ApiResponse'
         *              401:
         *                      description: Error by User has Not authorization
         *                      content:
         *                              application/json:
         *                                      schema:
         *                                              $ref: '#/components/schemas/ApiErrorAuthResponse'
         *              500:
         *                      description: Internal Server Error
         *                      content:
         *                              application/json:
         *                                      schema:
         *                                              $ref: '#/components/schemas/ApiErrorResponse'
         *              
         */