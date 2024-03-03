import { Router } from "express";
import { deleteOne, getAll, getOneById, postOne, updateOne } from "../controllers/parking";
import { parkingValidator } from "../validators/parkingValidator";

export const parkingRouter = Router()

parkingRouter
        .get("/parkings", getAll)
        .post("/parkings", parkingValidator,postOne)
        .put("/parkings/:id", parkingValidator,updateOne)
        .delete("/parkings/:id", deleteOne)
        .get("/parkings/:id", getOneById)