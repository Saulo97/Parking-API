import { Router } from "express";
import { deleteOne, getAll, getOneById, postOne, updateOne } from "../controllers/parking";
import { parkingValidator } from "../validators/parkingValidator";
import { authorize } from "../middlewares/authorize";
import { adminAuthorization } from "../middlewares/adminAuthorization";
import { isAdminOrEmployee } from "../middlewares/adminEmployeeAuthorization";

export const parkingRouter = Router()

parkingRouter
        .get("/parkings", authorize,getAll)
        .post("/parkings", authorize, isAdminOrEmployee,parkingValidator,postOne)
        .put("/parkings/:id", authorize,isAdminOrEmployee,parkingValidator,updateOne)
        .delete("/parkings/:id", authorize, isAdminOrEmployee,deleteOne)
        .get("/parkings/:id", authorize,getOneById)