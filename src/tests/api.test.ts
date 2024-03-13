import supertest from "supertest"
import { app} from "../app"
import { Roles, UserInput } from '../interfaces/user.interface';
import { User } from '../models/user';
import { BookingInput } from "../interfaces/booking.interface";
import { ParkingPlaceInput } from "../interfaces/parkingPlace.interface";
import { ParkingPlace } from "../models/parkingPlace";
import { Booking } from "../models/booking";
import { formatDate } from "../validators/createBookingValidator";
import { verifyToken } from "../utils/jwt.handle";
import { LogModel } from "../models/log";

const api = supertest(app)

describe('Bookings test',()=>{
    const newUser: UserInput = {
        name: "Test",
        email: "test.perico@gmail.com",
        password: "123456",
        rol: Roles.client
    }
    const newAdmin: UserInput = {
        name: "Test",
        email: "test.admin@gmail.com",
        password: "123456",
        rol: Roles.admin
    }
    const newPlaceA: ParkingPlaceInput = {
        name: "placeTest"
    }
    const firstBooking: BookingInput = {
        dateStart: "2024-05-20T10:00",
        dateEnd:"2024-05-20T10:30"
    }
    const secondBooking: BookingInput = {
        dateStart: "2024-05-20T12:00",
        dateEnd:"2024-05-20T12:30"
    }
    beforeAll(async()=>{
        // const userResponse = await api.post('/register').send(newUser)
        await api.post('/register').send(newAdmin)
        await api.post('/register').send(newUser)
        const adminTokenRes = await api.post('/login').send({email: newAdmin.email, password: newAdmin.password})
        await api.post('/parkings').auth(`${adminTokenRes.body}`,{type:"bearer"}).send(newPlaceA)
        const userTokenRes = await api.post('/login').send({email: newUser.email, password: newUser.password})
        await api.post('/bookings').auth(`${userTokenRes.body}`,{type:'bearer'}).send(firstBooking)
        await api.post('/bookings').auth(`${userTokenRes.body}`,{type:'bearer'}).send(secondBooking)
    })  
    describe('create a new Booking ',()=>{
        it('create new booking before all bookings',async()=>{
            const newBooking: BookingInput = {
                dateStart: "2024-05-20T09:00",
                dateEnd: "2024-05-20T09:00"
            }
            const tokenRes = await api.post('/login').send({email: newUser.email, password: newUser.password})
            const response = await api.post('/bookings').auth(`${tokenRes.body}`,{type:'bearer'}).send(newBooking)
            expect(response.status).toBe(201)
            expect(response.body.id).toBeDefined()
            expect(response.body.dateStart).toBe(newBooking.dateStart)
            expect(response.body.dateEnd).toBe(newBooking.dateEnd)
            expect(response.body.userId).toBeGreaterThan(0)
            expect(response.body.placeId).toBeGreaterThan(0)
        })
        it('create new booking after all bookings',async()=>{
            const newBooking: BookingInput = {
                dateStart: "2024-05-20T23:00",
                dateEnd: "2024-05-21T00:10"
            }
            const tokenRes = await api.post('/login').send({email: newUser.email, password: newUser.password})
            const response = await api.post('/bookings').auth(`${tokenRes.body}`,{type:'bearer'}).send(newBooking)
            expect(response.status).toBe(201)
            expect(response.body.id).toBeDefined()
            expect(response.body.dateStart).toBe(newBooking.dateStart)
            expect(response.body.dateEnd).toBe(newBooking.dateEnd)
            expect(response.body.userId).toBeGreaterThan(0)
            expect(response.body.placeId).toBeGreaterThan(0)
        })
        it('create new booking between 2 test bookings',async()=>{
            const newBooking: BookingInput = {
                dateStart: "2024-05-20T11:00",
                dateEnd: "2024-05-20T11:30"
            }
            const tokenRes = await api.post('/login').send({email: newUser.email, password: newUser.password})
            const response = await api.post('/bookings').auth(`${tokenRes.body}`,{type:'bearer'}).send(newBooking)
            expect(response.status).toBe(201)
            expect(response.body.id).toBeDefined()
            expect(response.body.dateStart).toBe(newBooking.dateStart)
            expect(response.body.dateEnd).toBe(newBooking.dateEnd)
            expect(response.body.userId).toBeGreaterThan(0)
            expect(response.body.placeId).toBeGreaterThan(0)
        })
        it('create new booking failed by dateStart is ocuppated',async()=>{
            const newBooking: BookingInput = {
                dateStart: "2024-05-20T12:10",
                dateEnd: "2024-05-20T13:30"
            }
            const tokenRes = await api.post('/login').send({email: newUser.email, password: newUser.password})
            const response = await api.post('/bookings').auth(`${tokenRes.body}`,{type:'bearer'}).send(newBooking)
            expect(response.status).toBe(404)
            expect(response.body.error).toBeDefined()
        })
        it('create new booking failed by dateEnd is ocuppated',async()=>{
            const newBooking: BookingInput = {
                dateStart: "2024-05-20T22:10",
                dateEnd: "2024-05-20T23:30"
            }
            const tokenRes = await api.post('/login').send({email: newUser.email, password: newUser.password})
            const response = await api.post('/bookings').auth(`${tokenRes.body}`,{type:'bearer'}).send(newBooking)
            expect(response.status).toBe(404)
            expect(response.body.error).toBeDefined()
        })
        it('create new booking failed by time of booking is ocuppated by another booking',async()=>{
            const newBooking: BookingInput = {
                dateStart: "2024-05-20T09:00",
                dateEnd: "2024-05-20T11:30"
            }
            const tokenRes = await api.post('/login').send({email: newUser.email, password: newUser.password})
            const response = await api.post('/bookings').auth(`${tokenRes.body}`,{type:'bearer'}).send(newBooking)
            expect(response.status).toBe(404)
            expect(response.body.error).toBeDefined()
        })
        it('create new booking failed because user is not authenticated',async()=>{
            const newBooking: BookingInput = {
                dateStart: "2024-05-20T08:00",
                dateEnd: "2024-05-20T08:30"
            }
            const response = await api.post('/bookings').send(newBooking)
            expect(response.status).toBe(401)
            expect(response.body.message).toBeDefined()
        })
        it('create new booking failed because start-date is after end-date',async()=>{
            const newBooking: BookingInput = {
                dateStart: "2024-05-20T010:00",
                dateEnd: "2024-05-20T08:30"
            }
            const tokenRes = await api.post('/login').send({email: newUser.email, password: newUser.password})
            const response = await api.post('/bookings').auth(`${tokenRes.body}`,{type: 'bearer'}).send(newBooking)
            expect(response.status).toBe(403)
            expect(response.body.error).toBeDefined()
        })
        it('create new booking failed because start-date or end-date is before today or now',async()=>{
            const newBooking: BookingInput = {
                dateStart: "2024-01-01T010:00",
                dateEnd: "2024-05-20T08:30"
            }
            const tokenRes = await api.post('/login').send({email: newUser.email, password: newUser.password})
            const response = await api.post('/bookings').auth(`${tokenRes.body}`,{type: 'bearer'}).send(newBooking)
            expect(response.status).toBe(403)
            expect(response.body.error).toBeDefined()
        })
    })
    afterAll(async()=>{
        const client = await User.findOne({where:{email: newUser.email}})
        await Booking.destroy({where:{userId: client?.id }})
        await User.destroy({where:{name: newUser.name}})
        await ParkingPlace.destroy({where: {name: newPlaceA.name}})
        await LogModel.deleteMany()
    })
})
describe('Real Time ocupation tests',()=>{
    const dateStart = new Date()
    dateStart.setHours(dateStart.getHours()-1)
    const start = formatDate(dateStart)
    const dateEnd = new Date()
    dateEnd.setHours(dateEnd.getHours()+1)
    const end = formatDate(dateEnd)
    const newEmployee: UserInput = {
        name: "Test",
        email: "test.employee@gmail.com",
        password: "123456",
        rol: Roles.employee
    }
    const newAdmin: UserInput = {
        name: "Test",
        email: "test.admin@gmail.com",
        password: "123456",
        rol: Roles.admin
    }
    const newPlaceA: ParkingPlaceInput = {
        name: "placeTest"
    }
    const firstBooking: BookingInput = {
        dateStart: `${start}`,
        dateEnd:`${end}`
    }
    beforeAll(async()=>{
        await api.post('/register').send(newAdmin)
        await api.post('/register').send(newEmployee)
        const adminTokenRes = await api.post('/login').send({email: newAdmin.email, password: newAdmin.password})
        await api.post('/parkings').auth(`${adminTokenRes.body}`,{type:"bearer"}).send(newPlaceA)
        await api.post('/bookings').auth(`${adminTokenRes.body}`,{type:"bearer"}).send(firstBooking)
    })
    describe('check real time parking ocupations',()=>{
        it('returns parking ocupated with one booking success',async()=>{
            const resToken = await api.post('/login').send({email: newEmployee.email, password: newEmployee.password})
            const response = await api.get('/bookings/ocupation').auth(`${resToken.body}`,{type: 'bearer'}).send()
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Array)
            
        })
        it('error to returns parking ocupated because user has not employee or admin role',async()=>{
            const userNotEmployee = {
                name: "Test",
                email:"user@gmail.com",
                password:"123456",
                rol: Roles.client
            }
            await api.post('/register').send(userNotEmployee)
            const resToken = await api.post('/login').send({email: userNotEmployee.email, password: userNotEmployee.password})
            const response = await api.get('/bookings/ocupation').auth(`${resToken.body}`,{type: 'bearer'}).send()
            expect(response.status).toBe(401)
            expect(response.body.message).toBeDefined()
            
        })
        it('error to returns parking ocupated because user is not authenticate',async()=>{
            const response = await api.get('/bookings/ocupation').send()
            expect(response.status).toBe(401)
            expect(response.body.message).toBeDefined()
            
        })
    })
    afterAll(async()=>{
        const user = await User.findOne({where: {email: newEmployee.email}})
        await Booking.destroy({where:{userId: user?.id}})
        await User.destroy({where:{name: newAdmin.name}})
        await ParkingPlace.destroy({where: {name: newPlaceA.name}})
        await LogModel.deleteMany()
    })
})
describe('User update tests by admin',()=>{
    const newUser: UserInput = {
        name: "Test",
        email: "test.perico@gmail.com",
        password: "123456",
        rol: Roles.client
    }
    const newAdmin: UserInput = {
        name: "Test",
        email: "test.admin@gmail.com",
        password: "123456",
        rol: Roles.admin
    }
    beforeEach(async()=>{
        // const userResponse = await api.post('/register').send(newUser)
        await api.post('/register').send(newAdmin)
        
    })
    describe('Updating an user',()=>{
        it('success user update by admin',async()=>{
            const userResponse = await api.post('/register').send(newUser)
            const id = userResponse.body.id
            const userUpdated = {
                email: "userUpdate@gmail.com"
            }
            const adminTokenRes = await api.post('/login').send({email: newAdmin.email, password: newAdmin.password})
            const response = await api.put(`/users/${id}`).auth(`${adminTokenRes.body}`,{type:'bearer'}).send(userUpdated)
            expect(response.status).toBe(201)
            expect(response.body.email).toBe(userUpdated.email)
        })
        it('error in user update by user has not authorization',async()=>{
            const userResponse = await api.post('/register').send(newUser)
            const id = userResponse.body.id
            const userUpdated = {
                email: "userUpdate@gmail.com"
            }
            const clientTokenRes = await api.post('/login').send({email: newUser.email, password: newUser.password})
            const response = await api.put(`/users/${id}`).auth(`${clientTokenRes.body}`,{type:'bearer'}).send(userUpdated)
            expect(response.status).toBe(401)
            expect(response.body.message).toBeDefined()
        })
        it('error in user update by user is not authenticated',async()=>{
            const userResponse = await api.post('/register').send(newUser)
            const id = userResponse.body.id
            const userUpdated = {
                email: "userUpdate@gmail.com"
            }
            const response = await api.put(`/users/${id}`).send(userUpdated)
            expect(response.status).toBe(401)
            expect(response.body.message).toBeDefined()
        })
        it('fail user update by admin because req.body is empty',async()=>{
            const userResponse = await api.post('/register').send(newUser)
            const id = userResponse.body.id
            const userUpdated = {
            }
            const adminTokenRes = await api.post('/login').send({email: newAdmin.email, password: newAdmin.password})
            const response = await api.put(`/users/${id}`).auth(`${adminTokenRes.body}`,{type:'bearer'}).send(userUpdated)
            expect(response.status).toBe(404)
            expect(response.body.error).toBeDefined()
        })
        it('fail user update by admin because request body has validation errors',async()=>{
            const userResponse = await api.post('/register').send(newUser)
            const id = userResponse.body.id
            const userUpdated = {
                email: "asdasdasd",
                name: ""
            }
            const adminTokenRes = await api.post('/login').send({email: newAdmin.email, password: newAdmin.password})
            const response = await api.put(`/users/${id}`).auth(`${adminTokenRes.body}`,{type:'bearer'}).send(userUpdated)
            expect(response.status).toBe(403)
            expect(response.body.error).toBeDefined()
        })
    })
    afterEach(async()=>{
        await User.destroy({where: {name: newUser.name}})
    })
    afterAll(async()=>{
        await LogModel.deleteMany()
    })
})
describe('Get Logs only for admin tests',()=>{
    const newUser: UserInput = {
        name: "Test",
        email: "test.perico@gmail.com",
        password: "123456",
        rol: Roles.client
    }
    const newAdmin: UserInput = {
        name: "Test",
        email: "test.admin@gmail.com",
        password: "123456",
        rol: Roles.admin
    }
    const newPlaceA: ParkingPlaceInput = {
        name: "placeTest"
    }
    const firstBooking: BookingInput = {
        dateStart: "2024-05-20T10:00",
        dateEnd:"2024-05-20T10:30"
    }
    const secondBooking: BookingInput = {
        dateStart: "2024-05-20T12:00",
        dateEnd:"2024-05-20T12:30"
    }
    beforeAll(async()=>{
        await api.post('/register').send(newAdmin)
        await api.post('/register').send(newUser)
        const adminTokenRes = await api.post('/login').send({email: newAdmin.email, password: newAdmin.password})
        await api.post('/parkings').auth(`${adminTokenRes.body}`,{type:"bearer"}).send(newPlaceA)
        const userTokenRes = await api.post('/login').send({email: newUser.email, password: newUser.password})
        await api.post('/bookings').auth(`${userTokenRes.body}`,{type:'bearer'}).send(firstBooking)
        await api.post('/bookings').auth(`${userTokenRes.body}`,{type:'bearer'}).send(secondBooking)
    })
    describe('get all Logs',()=>{
        it('get all Logs success',async()=>{
            const adminTokenRes = await api.post('/login').send({email: newAdmin.email, password: newAdmin.password})
            const response = await api.get('/logs').auth(`${adminTokenRes.body}`, {type: 'bearer'}).send()
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Array)
            expect(response.body[0]).toHaveProperty('_id')
            expect(response.body[0]).toHaveProperty('message')
        })
        it('get all Logs failed by user is not authenticated',async()=>{
            const response = await api.get('/logs').send()
            expect(response.status).toBe(401)
            expect(response.body.message).toBeDefined()
        })
        it('get all Logs failed by user has not authorization',async()=>{
            const adminTokenRes = await api.post('/login').send({email: newUser.email, password: newUser.password})
            const response = await api.get('/logs').auth(`${adminTokenRes.body}`, {type: 'bearer'}).send()
            expect(response.status).toBe(401)
            expect(response.body.message).toBeDefined()
        })
    })
    afterAll(async()=>{
        const client = await User.findOne({where:{email: newUser.email}})
        await Booking.destroy({where:{userId: client?.id }})
        await User.destroy({where:{name: newUser.name}})
        await ParkingPlace.destroy({where: {name: newPlaceA.name}})
        await LogModel.deleteMany()
    })
})
describe('Users Auth test',()=>{
    const newUser: UserInput = {
        name: "Test",
        email: "test.perico@gmail.com",
        password: "123456",
        rol: Roles.client
    }
    const newAdmin: UserInput = {
        name: "Test",
        email: "test.admin@gmail.com",
        password: "123456",
        rol: Roles.admin
    }
    beforeAll(async()=>{
        await api.post('/register').send(newUser)
        await api.post('/register').send(newAdmin)

    })  
    describe('register an user',()=>{
        it('return user registerd',async ()=>{
            const User = {
                name: "Test",
                email: "test.user@gmail.com",
                password: "123456",
            }
            const response = await api.post('/register').send(User)
            expect(response.status).toBe(200)
            expect(response.body.id).toBeDefined()
            expect(response.body.name).toBe(User.name)
            expect(response.body.email).toBe(User.email)
            expect(response.body.password).toBeDefined()
        })
        it('return user register error because user email is already exist',async ()=>{
            const User = {
                name: "Test",
                email: "test.perico@gmail.com",
                password: "123456",
            }
            const response = await api.post('/register').send(User)
            expect(response.status).toBe(404)
            expect(response.body.error).toBeDefined()
        })
    
    })
    describe('Login an user', ()=>{
        it('login user success and return token with email and rol properties',async()=>{
            const user = {
                email: 'test.user@gmail.com',
                password: '123456'
            }
            const response = await api.post('/login').send(user)
            expect(response.status).toBe(200)
            const verifiedToken = await verifyToken(response.body)
            expect(verifiedToken).toBeDefined()
            expect(verifiedToken).toHaveProperty('email')
            expect(verifiedToken).toHaveProperty('rol')
        })
        it('login user error by wrong email',async()=>{
            const user = {
                email: 'wrong@gmail.com',
                password: '123456'
            }
            const response = await api.post('/login').send(user)
            expect(response.status).toBe(404)
            expect(response.body.error).toBeDefined()
        })
        it('login user error by wrong password',async()=>{
            const user = {
                email: 'test.user@gmail.com',
                password: '123456122'
            }
            const response = await api.post('/login').send(user)
            expect(response.status).toBe(404)
            expect(response.body.error).toBeDefined()
        })
        it('login user error by wrong field unexpected',async()=>{
            const user = {
                name: 'wrong field',
                password: '123456'
            }
            const response = await api.post('/login').send(user)
            expect(response.status).toBe(403)
            expect(response.body.error).toBeDefined()
        })
    })
    afterAll(async()=>{
        await User.destroy({where: {name: newUser.name}})
        await LogModel.deleteMany()
    })
})


