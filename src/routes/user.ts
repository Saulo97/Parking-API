import { Router } from "express";
import { deleteOne, getAll, getOneById, postOne, updateOne } from "../controllers/user";
import { createUserValidator } from "../validators/createUserValidator";
import { updateUserValidator } from "../validators/updateUserValidator";

export const userRoutes = Router()

userRoutes
        .get("/users", getAll)
        .post("/users", createUserValidator,postOne)
        .put("/users/:id", updateUserValidator,updateOne)
        .delete("/users/:id", deleteOne)
        .get("/users/:id", getOneById)