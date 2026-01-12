import { Router } from "express";
import { UsersController } from "../controllers/usersController";

export const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.get("/", usersController.create)