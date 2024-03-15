import { Router } from "express";
import { deleteOne, getAll, getAllOcupation, getOneById, postOne, updateOne } from "../controllers/booking";
import { updateBookingValidator } from '../validators/updateBookingValidator';
import { createBookingValidator } from "../validators/createBookingValidator";
import { authorize } from "../middlewares/authorize";
import { adminAuthorization } from "../middlewares/adminAuthorization";
import { isAdminOrEmployee } from "../middlewares/adminEmployeeAuthorization";

export const bookingRouter = Router()

bookingRouter
        .get("/bookings", authorize,isAdminOrEmployee,getAll)
        /** 
         * @swagger
         * /bookings:
         *      get:
         *              tags:
         *                      - Booking
         *              summary: Obtener una lista con todas las reservas 
         *              description: Retorna una lista con todas las reservas .Solamente un usarioa admin o empleado tiene acceso a este endpoint
         *              security:
         *                      - bearerAuth: []
         *              responses:
         *                      200:
         *                              description: Succeful Booking return
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      type: array
         *                                                      items:
         *                                                              $ref: '#/components/schemas/Booking'
         *                      401:
         *                              description: Error by User has Not authorization
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorAuthResponse'
         *                      404:
         *                              description: Error by Booking not found
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
        .post("/bookings", authorize,createBookingValidator,postOne)
        /** 
         * @swagger
         * /bookings/:
         *      post:
         *              tags:
         *                      - Booking
         *              summary: Crear una Reserva 
         *              description: Retorna una sola reserva que pudo ser creada por cualquier usuario registrado en la aplicacion.
         *              security:
         *                      - bearerAuth: []
         *              requestBody:
         *                      description: Esquema de Crear Reserva
         *                      required: true
         *                      content:
         *                              application/json:
         *                                      schema: 
         *                                              $ref: '#/components/schemas/BookingInput'
         *              responses:
         *                      200:
         *                              description: Succeful parkingplace created return
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/Booking'
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
        .put("/bookings/:id", authorize, isAdminOrEmployee,updateBookingValidator,updateOne)
        /** 
         * @swagger
         * /bookings/{id}:
         *      put:
         *              tags:
         *                      - Booking
         *              summary: Editar una reserva por su id
         *              description: Retorna una reserva editado solamente por un administrador o un  empleado
         *              security:
         *                      - bearerAuth: []
         *              requestBody:
         *                      description: Esquema de Actualizar Reserva
         *                      required: true
         *                      content:
         *                              application/json:
         *                                      schema: 
         *                                              $ref: '#/components/schemas/BookingInput'
         *              parameters:
         *                      - name: id
         *                        in: path
         *                        required: true
         *                        schema:
         *                              type: integer
         *              responses:
         *                      200:
         *                              description: Succeful Booking return
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/Booking'
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
        .delete("/bookings/:id", authorize,deleteOne)
        /**
         * @swagger
         * /bookings/{id}:
         *      delete:
         *              tags:
         *                      - Booking
         *              summary: Eliminar una reserva por su id
         *              description: Retorna la reserva eliminada con la propiedad isDeleted en true .Cualquier usuario registrado tiene acceso a este endpoint
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
         *                              description: Succeful booking return
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/Booking'
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
         *                      500:
         *                              description: Internal Server Error
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorResponse'
         *              
         */
        .get("/bookings/ocupation", authorize,isAdminOrEmployee,getAllOcupation)
        /** 
         * @swagger
         * /bookings/ocupation:
         *      get:
         *              tags:
         *                      - Booking
         *              summary: Obtener una lista con todas las reservas que estan en ejecutandose en tiempo real 
         *              description: Retorna una lista con todas las reservas que estan ejecutandose en el momento en que se consulte el endpoint. Solamente un usarioa admin o empleado tiene acceso a este endpoint
         *              security:
         *                      - bearerAuth: []
         *              responses:
         *                      200:
         *                              description: Succeful Booking return
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      type: array
         *                                                      items:
         *                                                              $ref: '#/components/schemas/Booking'
         *                      401:
         *                              description: Error by User has Not authorization
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorAuthResponse'
         *                      404:
         *                              description: Error by Booking not found
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
        .get("/bookings/:id", authorize,getOneById)
        /** 
         * @swagger
         * /bookings/{id}:
         *      get:
         *              tags:
         *                      - Booking
         *              summary: Obtener una reserva por su id
         *              description: Retorna una sola Reserva. Cualquier usuario registrado tiene acceso a este endpoint
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
         *                              description: Succeful Booking return
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/Booking'
         *                      401:
         *                              description: Error by User has Not authorization
         *                              content:
         *                                      application/json:
         *                                              schema:
         *                                                      $ref: '#/components/schemas/ApiErrorAuthResponse'
         *                      404:
         *                              description: Error by Booking not found
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