import { Router } from "express";
import { deleteOne, getAll, getOneById, postOne, updateOne } from "../controllers/user";
import { createUserValidator } from "../validators/createUserValidator";

export const userRoutes = Router()

userRoutes
        .get("/users", getAll)
        .post("/users", createUserValidator,postOne)
        .put("/users/:id", updateOne)
        .delete("/users/:id", deleteOne)
        .get("/users/:id", getOneById)