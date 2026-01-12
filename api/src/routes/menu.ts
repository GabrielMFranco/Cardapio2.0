import { Router } from "express";
import { MenuController } from "../controllers/menuController";

export const menuRoutes = Router()
const menuController = new MenuController()

menuRoutes.post("/", menuController.index)
