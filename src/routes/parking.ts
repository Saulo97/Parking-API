import { Router } from "express";
import { deleteOne, getAll, getOneById, postOne, updateOne } from "../controllers/parking";
import { parkingValidator } from "../validators/parkingValidator";
import { authorize } from "../middlewares/authorize";
import { isAdminOrEmployee } from "../middlewares/adminEmployeeAuthorization";

export const parkingRouter = Router()

parkingRouter
        .get("/parkings", authorize,getAll)
        /**
         * @swagger
         * /parkings:
         *      get:
         *              tags:
         *                      - Parking
         *              summary: Obtener Todos las plazas de parqueo existentes
         *              description: Retorna un arreglo de todas las plazas de parqueo que existen en el parking
         *              responses:
         *                      200:
         *                              description: Succeful places array return
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      type: array
         *                                                      items:
         *                                                              $ref: '#/components/schemas/ParkingPlace'
         *                      401:
         *                              description: User has not Authorization
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorAuthResponse'
         *                      404:
         *                              description: Parking Places Not Found
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
        .post("/parkings", authorize, isAdminOrEmployee,parkingValidator,postOne)
        /** 
         * @swagger
         * /parkings/:
         *      post:
         *              tags:
         *                      - Parking
         *              summary: Crear una plaza de parqueo 
         *              description: Retorna una sola plaza de parqueo que pudo ser creada por un administrador o un empleado
         *              security:
         *                      - bearerAuth: []
         *              requestBody:
         *                      description: Esquema de Crear Plaza de Parqueo
         *                      required: true
         *                      content:
         *                              application/json:
         *                                      schema: 
         *                                              $ref: '#/components/schemas/ParkingPlace'
         *              responses:
         *                      200:
         *                              description: Succeful parkingplace created return
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ParkingPlace'
         *                      401:
         *                              description: Error by User has Not authorization
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorAuthResponse'
         *                      403:
         *                              description: Error in request body
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      type: array
         *                                                      items:
         *                                                              $ref: '#/components/schemas/ApiErrorValidationResponse'
         *                      500:
         *                              description: Internal Server Error
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorResponse'
         *              
         */
        .put("/parkings/:id", authorize,isAdminOrEmployee,parkingValidator,updateOne)
        /** 
         * @swagger
         * /parkings/{id}:
         *      put:
         *              tags:
         *                      - Parking
         *              summary: Editar una plaza de parqueo por su id
         *              description: Retorna una sola plaza de parqueo que pudo ser editado por un administrador o un empleado
         *              security:
         *                      - bearerAuth: []
         *              requestBody:
         *                      description: Esquema de Actualizar Plaza de Parqueo
         *                      required: true
         *                      content:
         *                              application/json:
         *                                      schema:
         *                                              $ref: '#/components/schemas/ParkingPlace'
         *              parameters:
         *                      - name: id
         *                        in: path
         *                        required: true
         *                        schema:
         *                              type: integer
         *              responses:
         *                      200:
         *                              description: Succeful parkingplace return
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ParkingPlace'
         *                      401:
         *                              description: Error by User has Not authorization
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorAuthResponse'
         *                      403:
         *                              description: Error in request body
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      type: array
         *                                                      items:
         *                                                              $ref: '#/components/schemas/ApiErrorValidationResponse'
         *                      404:
         *                              description: Error by Parking PLace not found
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
        .delete("/parkings/:id", authorize, isAdminOrEmployee,deleteOne)
        /**
         * @swagger
         * /parkings/{id}:
         *      delete:
         *              tags:
         *                      - Parking
         *              summary: Eliminar una plaza de aparcamiento por su id
         *              description: Solo el admin y el empleado tienen acceso a este endpoint
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
         *                              description: Succeful parking place deleted
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
         *                              description: Parking Not Found
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
        .get("/parkings/:id", authorize,getOneById)
        /** 
         * @swagger
         * /parkings/{id}:
         *      get:
         *              tags:
         *                      - Parking
         *              summary: Obtener un parking place por su id
         *              description: Retorna un solo Parking place. Cualquier usuario registrado tiene acceso a este endpoint
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
         *                                                      $ref: '#/components/schemas/ParkingPlace'
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