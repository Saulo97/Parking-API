import { Router } from "express";
import { deleteOne, getAll, getOneById, updateOne } from "../controllers/user";
import { createUserValidator } from "../validators/createUserValidator";
import { updateUserValidator } from "../validators/updateUserValidator";
import { authorize } from "../middlewares/authorize";
import { adminAuthorization } from "../middlewares/adminAuthorization";

export const userRoutes = Router()

userRoutes
        .get("/users", authorize, adminAuthorization ,getAll)
        // .post("/users", createUserValidator,postOne)
        .put("/users/:id", authorize, adminAuthorization ,updateUserValidator,updateOne)
        .delete("/users/:id", authorize, adminAuthorization,deleteOne)
        .get("/users/:id", authorize,getOneById)