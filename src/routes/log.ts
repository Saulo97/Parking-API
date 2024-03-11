import { Router } from "express";
import { authorize } from "../middlewares/authorize";
import { adminAuthorization } from "../middlewares/adminAuthorization";
import { getAll } from "../controllers/log";

export const logRoutes = Router()


logRoutes.get('/logs', authorize, adminAuthorization, getAll)