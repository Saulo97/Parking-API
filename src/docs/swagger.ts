import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.3",
    info: {
        title: "Documentacion del API de parking",
        version: "1.0.0",
    },
    servers: [{
        url: "http://localhost:3000"
    }],
    components:{
        securitySchemes:{
            bearerAuth :{
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {
            User: {
                type: 'object',
                required: ['name','email', 'password'],
                properties:{
                    id: {
                        type: 'integer'
                    },
                    name: {
                        type: 'string',
                        example: 'Perico'
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'perico1@gmail.com'
                    },
                    password: {
                        type: 'string',
                        example: '123456'
                    },
                    rol: {
                        type: 'string',
                        example: 'admin',
                        description: 'Lo roles validos son admin, client o employee'
                    },
                    isDeleted: {
                        type: 'boolean',
                        example: 'false'
                    }
                }
            },
            UserInput: {
                type: 'object',
                required: ['name','email', 'password'],
                properties:{
                    name: {
                        type: 'string',
                        example: 'Perico'
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'newuser@gmail.com'
                    },
                    password: {
                        type: 'string',
                        example: '123456'
                    },
                    rol: {
                        type: 'string',
                        example: 'admin',
                        description: 'Lo roles validos son admin, client o employee'
                    }
                }
            },
            Auth: {
                type: 'object',
                required: ['name','email', 'password'],
                properties:{
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'perico1@gmail.com',
                    },
                    password: {
                        type: 'string',
                        example: '123456'
                    },
                }
            },
            Booking: {
                type: 'object',
                required: ['dateStart','dateEnd'],
                properties:{
                    id: {
                        type: 'integer'
                    },
                    dateStart: {
                        type: 'string',
                        format: 'YYYY-MM-DDTHH:MM',
                        example: '2024-07-25T16:24',
                        description: 'El formato de la hora debe ser 24horas'
                    },
                    dateEnd: {
                        type: 'string',
                        format: 'YYYY-MM-DDTHH:MM',
                        example: '2024-07-25T16:24',
                        description: 'El formato de la hora debe ser 24horas'
                    },
                    userId: {
                        type: 'integer',
                        example: '1',
                        description: 'Referencia a la tabla de usario, a su propiedad id '
                    },
                    placeId: {
                        type: 'integer',
                        example: '1',
                        description: 'Referencia a la tabla de placeParking, a su propiedad id '
                    },
                    isDeleted: {
                        type: 'boolean',
                        example: 'false'
                    }
                }
            },
            BookingInput: {
                type: 'object',
                required: ['dateStart','dateEnd'],
                properties:{
                    dateStart: {
                        type: 'string',
                        format: 'YYYY-MM-DDTHH:MM',
                        example: '2024-07-25T16:24',
                        description: 'El formato de la hora debe ser 24horas'
                    },
                    dateEnd: {
                        type: 'string',
                        format: 'YYYY-MM-DDTHH:MM',
                        example: '2024-07-25T16:24',
                        description: 'El formato de la hora debe ser 24horas'
                    }
                }
            },
            ParkingPLace: {
                type: 'object',
                required: ['name'],
                properties:{
                    id: {
                        type: 'integer'
                    },
                    name: {
                        type: 'string',
                        example: 'Plaza A'
                    }
                }
            },
            Log: {
                type: 'object',
                properties:{
                    _id: {
                        type: 'string'
                    },
                    message: {
                        type: 'string',
                        example: 'The user with email perico1@gmail.com has created a new Booking whit start date: 2024-03-10T23:09, and end date: 2024-03-10T23:20'
                    }
                }
            },
            ApiResponse: {
                type: 'object',
            },
            ApiErrorResponse: {
                type: 'object',
                properties:{
                    error: {
                        type: 'string',
                    }
                }
            },
            ApiErrorValidationResponse: {
                type: 'object',
                properties:{
                    error: {
                        type: 'array',
                    }
                }
            },
            ApiErrorAuthResponse: {
                type: 'object',
                properties:{
                    status: {
                        type: 'integer',
                        example: 401
                    },
                    error: {
                        type: 'string',
                        example: 'Session is not valid'
                    }
                }
            }
        }
    }
}


const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./src/routes/*"],
}


export const swaggerSetup = swaggerJSDoc(swaggerOptions)