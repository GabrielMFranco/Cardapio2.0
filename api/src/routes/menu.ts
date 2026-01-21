import { Router } from "express";
import { MenuController } from "../controllers/menuController";
import uploadConfig from "../config/upload";
import multer from "multer";
import { verifyUserAuthorization } from "../middlewares/verifyUserAuthorization";

export const menuRoutes = Router()
const menuController = new MenuController()

const upload = multer(uploadConfig.MULTER);

menuRoutes.get(
    "/",
    verifyUserAuthorization(["ADMIN", "CUSTOMER"]),
    menuController.index
)
menuRoutes.post(
    "/",
    verifyUserAuthorization(["ADMIN"]),
    upload.single("img"),
    menuController.create)
menuRoutes.delete(
    "/:id",
    verifyUserAuthorization(["ADMIN"]),
    menuController.delete
)
menuRoutes.put(
    "/:id",
    verifyUserAuthorization(["ADMIN"]),
    upload.single("img"),
    menuController.updated
)