import { Router } from "express";
import { deleteOne, getAll, getOneById, updateOne } from "../controllers/user";
import { createUserValidator } from "../validators/createUserValidator";
import { updateUserValidator } from "../validators/updateUserValidator";
import { authorize } from "../middlewares/authorize";
import { adminAuthorization } from "../middlewares/adminAuthorization";

export const userRoutes = Router()

userRoutes
        .get("/users", authorize, adminAuthorization ,getAll)
        /**
         * @swagger
         * /users:
         *      get:
         *              tags:
         *                      - User
         *              summary: Obtener Todos los usuarios
         *              description: Retorna un arreglo de usuarios con el campo isDeleted en false. Solo el admin tiene acceso a este endpoint
         *              security:
         *                      - bearerAuth: []
         *              responses:
         *                      200:
         *                              description: Succeful users array return
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiResponse'
         *                      401:
         *                              description: User has not Authorization
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorAuthResponse'
         *                      404:
         *                              description: Users Not Found
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorResponse'
         *              
         */
        .put("/users/:id", authorize, adminAuthorization ,updateUserValidator,updateOne)
        /** 
         * @swagger
         * /users/{id}:
         *      put:
         *              tags:
         *                      - User
         *              summary: Editar un usuario por su id
         *              description: Retorna un solo usuario editado solamente por un administrador
         *              security:
         *                      - bearerAuth: []
         *              parameters:
         *                      - name: id
         *                        in: path
         *                        required: true
         *                        schema:
         *                              type: integer
         *              responses:
         *                      200:
         *                              description: Succeful user return
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiResponse'
         *                      401:
         *                              description: Error by User has Not authorization
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorAuthResponse'
         *                      404:
         *                              description: Error by Usernot found
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorResponse'
         *                      500:
         *                              description: Internal Server Error
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorResponse'
         *              
         */
        
        .delete("/users/:id", authorize, adminAuthorization,deleteOne)
        /**
         * @swagger
         * /users/{id}:
         *      delete:
         *              tags:
         *                      - User
         *              summary: Obtener Todos los usuarios
         *              description: Retorna el usuario eliminado con la propiedad isDeleted en true . Solo el admin tiene acceso a este endpoint
         *              security: 
         *                      - bearerAuth: []
         *              parameters:
         *                      - name: id
         *                        in: path
         *                        required: true
         *                        schema:
         *                              type: integer
         *              responses:
         *                      200:
         *                              description: Succeful users return
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiResponse'
         *                      401:
         *                              description: User has not Authorization
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorAuthResponse'
         *                      404:
         *                              description: Users Not Found
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorResponse'
         *              
         */
        .get("/users/:id", authorize, adminAuthorization,getOneById)
        /** 
         * @swagger
         * /users/{id}:
         *      get:
         *              tags:
         *                      - User
         *              summary: Obtener un usuario por su id
         *              description: Retorna un solo usuario. Solo el admin tiene acceso a este endpoint
         *              security:
         *                      - bearerAuth: []
         *              parameters:
         *                      - name: id
         *                        in: path
         *                        required: true
         *                        schema:
         *                              type: integer
         *              requestBody:
         *                      description: Esquema de Login
         *                      required: true
         *                      content:
         *                              application/json:
         *                                      schema:
         *                                              $ref: '#/components/schemas/Auth' 
         *              responses:
         *                      200:
         *                              description: Succeful user return
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiResponse'
         *                      401:
         *                              description: Error by User has Not authorization
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorAuthResponse'
         *                      404:
         *                              description: Error by Usernot found
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorResponse'
         *                      500:
         *                              description: Internal Server Error
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorResponse'
         *              
         */