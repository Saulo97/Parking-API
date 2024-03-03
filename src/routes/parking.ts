import { Router } from "express";
import { deleteOne, getAll, getOneById, postOne, updateOne } from "../controllers/parking";

export const parkingRouter = Router()

parkingRouter
        .get("/parkings", getAll)
        .post("/parkings", postOne)
        .put("/parkings/:id",updateOne)
        .delete("/parkings/:id", deleteOne)
        .get("/parkings/:id", getOneById)