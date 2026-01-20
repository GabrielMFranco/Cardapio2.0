import { Router } from "express";
import { usersRoutes } from "./userCreate";
import { signInRoutes } from "./signIn";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { menuRoutes } from "./menu";
import { uploadsRoutes } from "./uploads";


export const routes = Router()

routes.use("/userscreate", usersRoutes)
routes.use("/signin", signInRoutes)

routes.use(ensureAuthenticated)
routes.use("/menu", menuRoutes)
routes.use("/uploads", uploadsRoutes)