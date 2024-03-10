import { Router } from "express";
import { deleteOne, getAll, getOneById, postOne, updateOne } from "../controllers/parking";
import { parkingValidator } from "../validators/parkingValidator";
import { authorize } from "../middlewares/authorize";
import { adminAuthorization } from "../middlewares/adminAuthorization";

export const parkingRouter = Router()

parkingRouter
        .get("/parkings", getAll)
        .post("/parkings", authorize, adminAuthorization,parkingValidator,postOne)
        .put("/parkings/:id", authorize, adminAuthorization,parkingValidator,updateOne)
        .delete("/parkings/:id", authorize, adminAuthorization,deleteOne)
        .get("/parkings/:id", getOneById)